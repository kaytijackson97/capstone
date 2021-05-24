package learn.plantbase.data;

import learn.plantbase.data.mappers.PostMapper;
import learn.plantbase.data.mappers.ReplyMapper;
import learn.plantbase.models.Post;
import learn.plantbase.models.Reply;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PostJDBCTemplateRepository implements PostRepository {
    private final JdbcTemplate template;

    public PostJDBCTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<Post> findAll() {
        final String sql = "select post_id, username, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post limit 1000;";
        return template.query(sql, new PostMapper());
    }

    @Override
    public List<Post> findByUsername(String username) {
        final String sql = "select post_id, username, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post " +
                "where username = ?;";
        return template.query(sql, new PostMapper(), username);
    }

    @Override
    public List<Post> findByPlantId(int plantId) {
        final String sql = "select post_id, username, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post " +
                "where plant_id = ?;";
        return template.query(sql, new PostMapper(), plantId);
    }

    @Override
    public Post findById(int postId) {
        final String sql = "select post_id, username, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post " +
                "where post_id = ?;";
        Post post = template.query(sql, new PostMapper(), postId).stream()
                .findFirst().orElse(null);

        if (post != null) {
            addReplies(post);
        }

        return post;
    }

    @Override
    public Post addPost(Post post) {
        if (post == null) {
            return null;
        }

        if (post.getPlantId() == 0) {
            final String nullSql = "insert into post (username, plant_id, garden_id, caption, photo, datetime_posted, like_count) " +
                    "values (?, null, ?, ?, ?, ?, ?);";

            KeyHolder keyHolder = new GeneratedKeyHolder();
            int rowsAffected = template.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(nullSql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, post.getUsername());
                ps.setInt(2, post.getGardenId());
                ps.setString(3, post.getCaption());
                ps.setString(4, post.getPhoto());
                ps.setString(5, post.getDatetimePosted().toString());
                ps.setInt(6, post.getLikeCount());

                return ps;
            }, keyHolder);

            if (rowsAffected <= 0) {
                return null;
            }

            post.setPostId(keyHolder.getKey().intValue());
            return post;
        }

        final String sql = "insert into post (username, plant_id, garden_id, caption, photo, datetime_posted, like_count) " +
                "values (?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, post.getUsername());
            ps.setInt(2, post.getPlantId());
            ps.setInt(3, post.getGardenId());
            ps.setString(4, post.getCaption());
            ps.setString(5, post.getPhoto());
            ps.setString(6, post.getDatetimePosted().toString());
            ps.setInt(7, post.getLikeCount());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        post.setPostId(keyHolder.getKey().intValue());
        return post;
    }

    @Override
    public boolean editPost(Post post) {
        if (post == null) {
            return false;
        }

        final String sql = "update post set " +
                "plant_id = ?, " +
                "caption = ?, " +
                "photo = ?, " +
                "like_count = ? " +
                "where post_id = ?;";
        return template.update(sql, post.getPlantId(), post.getCaption(), post.getPhoto(), post.getLikeCount(), post.getPostId()) > 0;
    }

    @Override
    @Transactional
    public boolean deletePost(int postId) {
        template.update("set sql_safe_updates = 0;");
        template.update("delete from reply where post_id = ?;", postId);
        template.update("set sql_safe_updates = 1;");
        final String sql = "delete from post where post_id = ?";

        return template.update(sql, postId) > 0;
    }

    private void addReplies(Post post) {
        final String sql = "select reply_id, username, post_id, reply, datetime_posted, like_count " +
                "from reply where post_id = ?;";
        List<Reply> replies = template.query(sql, new ReplyMapper(), post.getPostId());
        post.setReplies(replies);
    }
}
