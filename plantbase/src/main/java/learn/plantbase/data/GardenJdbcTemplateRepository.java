package learn.plantbase.data;

import learn.plantbase.data.mappers.GardenMapper;
import learn.plantbase.data.mappers.PlantMapper;
import learn.plantbase.data.mappers.PostMapper;
import learn.plantbase.models.Garden;
import learn.plantbase.models.Plant;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class GardenJdbcTemplateRepository implements GardenRepository {

    private final JdbcTemplate jdbcTemplate;

    public GardenJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Garden> findAll() {
        final String sql = "select garden_id from garden;";
        return jdbcTemplate.query(sql, new GardenMapper());
    }

    @Override
    public Garden findById(int gardenId) {
        final String sql = "select garden_id from garden where garden_id = ?;";
        Garden garden = jdbcTemplate.query(sql, new GardenMapper(), gardenId).stream().findFirst().orElse(null);
        if (garden != null ) {
            addPosts(garden);
        }
        return garden;
    }

    //commented out until PostMapper is merged
    private void addPosts(Garden garden) {
        final String sql = "select post_id, user_id, plant_id, garden_id, caption, photo, datetimePosted, likeCount " +
                "from post " +
                "where garden_id = ?;";
        var posts = jdbcTemplate.query(sql, new PostMapper(), garden.getGardenId());
        garden.setPosts(posts);
    }
}
