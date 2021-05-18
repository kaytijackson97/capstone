package learn.plantbase.data.mappers;

import learn.plantbase.models.Reply;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ReplyMapper implements RowMapper<Reply> {

    @Override
    public Reply mapRow(ResultSet resultSet, int i) throws SQLException {
        Reply reply = new Reply();
        reply.setReplyId(resultSet.getInt("reply_id"));
        reply.setUserId(resultSet.getInt("user_id"));
        reply.setPostId(resultSet.getInt("post_id"));
        reply.setReply(resultSet.getString("reply"));

        String datetimePosted = resultSet.getString("datetime_posted");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(datetimePosted, formatter);
        reply.setDatetimePosted(dateTime);

        reply.setLikeCount(resultSet.getInt("like_count"));

        return reply;
    }
}
