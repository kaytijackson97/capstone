package learn.plantbase.data;

import learn.plantbase.data.mappers.PostMapper;
import learn.plantbase.models.Post;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

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
        final String sql = "select post_id, user_id, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post limit 1000;";
        return template.query(sql, new PostMapper());
    }

    @Override
    public List<Post> findByUserId(int userId) {
        final String sql = "select post_id, user_id, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post " +
                "where user_id = ?;";
        return template.query(sql, new PostMapper(), userId);
    }

    @Override
    public Post findById(int postId) {
        final String sql = "select post_id, user_id, plant_id, garden_id, caption, photo, datetime_posted, like_count from " +
                "post " +
                "where post_id = ?;";
        return template.query(sql, new PostMapper(), postId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Post addPost(Post post) {
        if (post == null) {
            return null;
        }

        final String sql = "insert into post (post_id, user_id, plant_id, garden_id, caption, photo, datetime_posted, like_count) " +
                "values (?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, post.getUserId());
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

    @Override
    public boolean editPost(Post post) {
        final String sql = "update post set " +
                "caption = ?, " +
                "photo = ? " +
                "where post_id = ?;";
        return template.update(sql, post.getCaption(), post.getPhoto(), post.getPostId()) > 0;
    }

    @Override
    public boolean deletePost(int postId) {
        final String sql = "delete from post where post_id = ?";
        return template.update(sql, postId) > 0;
    }
}
