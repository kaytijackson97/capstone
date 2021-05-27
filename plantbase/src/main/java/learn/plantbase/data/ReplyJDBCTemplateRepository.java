package learn.plantbase.data;

import learn.plantbase.data.mappers.ReplyMapper;
import learn.plantbase.models.Reply;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ReplyJDBCTemplateRepository implements ReplyRepository {

    private final JdbcTemplate template;

    public ReplyJDBCTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<Reply> findByPostId(int postId) {
        final String sql = "select reply_id, username, post_id, reply, datetime_posted, like_count from " +
                "reply " +
                "where post_id = ?;";
        return template.query(sql, new ReplyMapper(), postId);
    }

    @Override
    public Reply findById(int replyId) {
        final String sql = "select reply_id, username, post_id, reply, datetime_posted, like_count from reply " +
                "where reply_id = ?;";
        return template.query(sql, new ReplyMapper(), replyId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Reply addReply(Reply reply) {
        if (reply == null) {
            return null;
        }

        if (reply.getUsername() == null || reply.getDatetimePosted() == null) {
            return null;
        }

        final String sql = "insert into reply (username, post_id, reply, datetime_posted, like_count) " +
                "values (?, ?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, reply.getUsername());
            ps.setInt(2, reply.getPostId());
            ps.setString(3, reply.getReply());
            ps.setString(4, reply.getDatetimePosted().toString());
            ps.setInt(5, reply.getLikeCount());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        reply.setReplyId(keyHolder.getKey().intValue());
        return reply;
    }

    @Override
    public boolean editReply(Reply reply) {
        if (reply == null) {
            return false;
        }

        if (reply.getUsername() == null || reply.getDatetimePosted() == null) {
            return false;
        }

        final String sql = "update reply set " +
                "reply = ?, " +
                "like_count = ? " +
                "where reply_id = ?;";
        return template.update(sql, reply.getReply(), reply.getLikeCount(), reply.getReplyId()) > 0;
    }

    @Override
    public boolean deleteById(int replyId) {
        return template.update("delete from reply where reply_id = ?;", replyId) > 0;
    }
}
