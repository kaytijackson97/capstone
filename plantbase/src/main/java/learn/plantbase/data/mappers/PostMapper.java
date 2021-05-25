package learn.plantbase.data.mappers;

import learn.plantbase.models.Post;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class PostMapper implements RowMapper<Post> {
    @Override
    public Post mapRow(ResultSet resultSet, int i) throws SQLException {
        Post post = new Post();
        post.setPostId(resultSet.getInt("post_id"));
        post.setUsername(resultSet.getString("username"));
        post.setPlantId(resultSet.getInt("plant_id"));
        post.setGardenId(resultSet.getInt("garden_id"));
        post.setCaption(resultSet.getString("caption"));
        post.setPhoto(resultSet.getString("photo"));

        Timestamp datetimePosted = resultSet.getTimestamp("datetime_posted");
        LocalDateTime timePosted = datetimePosted.toLocalDateTime();

        int hours = LocalDateTime.now().getHour();
        int hoursUTC = LocalDateTime.now(ZoneOffset.UTC).getHour();
        int difference = hoursUTC - hours;

        post.setDatetimePosted(timePosted.plusHours(difference));

        post.setLikeCount(resultSet.getInt("like_count"));

        return post;
    }
}
