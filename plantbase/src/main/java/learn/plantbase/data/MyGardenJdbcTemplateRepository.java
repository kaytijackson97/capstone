package learn.plantbase.data;

import learn.plantbase.data.mappers.MyGardenMapper;
import learn.plantbase.data.mappers.PlantMapper;
import learn.plantbase.data.mappers.PostMapper;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Plant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class MyGardenJdbcTemplateRepository implements MyGardenRepository {

    private final JdbcTemplate jdbcTemplate;

    public MyGardenJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<MyGarden> findAll() {
        final String sql = "select my_garden_id, user_id, garden_name, bio, photo from my_garden;";
        return jdbcTemplate.query(sql, new MyGardenMapper());
    }

    @Override
    public MyGarden findById(int myGardenId) {
        final String sql = "select my_garden_id, user_id, garden_name, bio, photo from my_garden where my_garden_id = ?;";
        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), myGardenId).stream().findFirst().orElse(null);
        if (myGarden != null) {
            addPlants(myGarden);
        }
        return myGarden;
    }

    @Override
    public MyGarden findByUser(int userId) {
        final String sql = "select my_garden_id, user_id, garden_name, bio, photo from my_garden where userId = ?;";
        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), userId).stream().findFirst().orElse(null);
        if (myGarden != null) {
            addPlants(myGarden);
        }
        return myGarden;
    }

    @Override
    public MyGarden addMyGarden(MyGarden myGarden) {
        final String sql = "insert into my_garden (user_id, garden_name, bio, photo) " +
                "values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, myGarden.getUserId());
            ps.setString(2, myGarden.getGardenName());
            ps.setString(3, myGarden.getBio());
            ps.setString(4, myGarden.getPhoto());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        }
        myGarden.setMyGardenId(keyHolder.getKey().intValue());
        return myGarden;
    }

    @Override
    public boolean editMyGarden(MyGarden myGarden) {
        final String sql = "update my_garden set " +
                "garden_name = ?, " +
                "bio = ?, " +
                "photo = ? " +
                "where my_garden_id = ?;";
        return jdbcTemplate.update(sql,
                myGarden.getGardenName(),
                myGarden.getBio(),
                myGarden.getPhoto(),
                myGarden.getMyGardenId()) > 0;
    }

    @Override
    public boolean deleteById(int myGardenId) {
        jdbcTemplate.update("delete from plant where my_garden_id = ?;", myGardenId);
        return jdbcTemplate.update("delete from my_garden where my_garden_id = ?;", myGardenId) > 0;
    }

    private void addPlants(MyGarden myGarden) {


//        final String sql = "select post_id, user_id, plant_id, garden_id, caption, photo, datetimePosted, likeCount " +
//                "from post " +
//                "where plant_id = ?;";
//        var posts = jdbcTemplate.query(sql, new PostMapper(), plant.getPlantId());
//        plant.setPosts(posts);
    }
}
