package learn.plantbase.data.mappers;

import learn.plantbase.models.Reply;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public class ReplyMapper implements RowMapper<Reply> {

    @Override
    public Reply mapRow(ResultSet resultSet, int i) throws SQLException {
        Reply reply = new Reply();
        reply.setReplyId(resultSet.getInt("reply_id"));
        reply.setPlanterId(resultSet.getInt("planter_id"));
        reply.setPostId(resultSet.getInt("post_id"));
        reply.setReply(resultSet.getString("reply"));

        Timestamp datetimePosted = resultSet.getTimestamp("datetime_posted");
        datetimePosted.toLocalDateTime();
        reply.setDatetimePosted(datetimePosted.toLocalDateTime());

        reply.setLikeCount(resultSet.getInt("like_count"));

        return reply;
    }
}
