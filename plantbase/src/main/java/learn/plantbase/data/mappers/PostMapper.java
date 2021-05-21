package learn.plantbase.data.mappers;

import learn.plantbase.models.Post;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public class PostMapper implements RowMapper<Post> {
    @Override
    public Post mapRow(ResultSet resultSet, int i) throws SQLException {
        Post post = new Post();
        post.setPostId(resultSet.getInt("post_id"));
        post.setPlanterId(resultSet.getInt("user_id"));
        post.setPlantId(resultSet.getInt("plant_id"));
        post.setGardenId(resultSet.getInt("garden_id"));
        post.setCaption(resultSet.getString("caption"));
        post.setPhoto(resultSet.getString("photo"));

        Timestamp datetimePosted = resultSet.getTimestamp("datetime_posted");
        datetimePosted.toLocalDateTime();
        post.setDatetimePosted(datetimePosted.toLocalDateTime());

        post.setLikeCount(resultSet.getInt("like_count"));

        return post;
    }
}
