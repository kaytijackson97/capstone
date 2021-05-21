package learn.plantbase.data;

import learn.plantbase.data.mappers.MyGardenMapper;
import learn.plantbase.data.mappers.PlantMapper;
import learn.plantbase.models.MyGarden;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class MyGardenJdbcTemplateRepository implements MyGardenRepository {

    private final JdbcTemplate jdbcTemplate;

    public MyGardenJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<MyGarden> findAll() {
        final String sql = "select my_garden_id, planter_id, garden_name, bio, photo from my_garden;";
        return jdbcTemplate.query(sql, new MyGardenMapper());
    }

    @Override
    @Transactional
    public MyGarden findById(int myGardenId) {
        final String sql = "select my_garden_id, planter_id, garden_name, bio, photo from my_garden where my_garden_id = ?;";
        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), myGardenId).stream().findAny().orElse(null);
        if (myGarden != null) {
            addPlants(myGarden);
        }
        return myGarden;
    }

    @Override
    public MyGarden findByPlanter(int planterId) {
        final String sql = "select my_garden_id, planter_id, garden_name, bio, photo from my_garden where planter_id = ?;";
        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), planterId).stream().findFirst().orElse(null);
        if (myGarden != null) {
            addPlants(myGarden);
        }
        return myGarden;
    }

    @Override
    public MyGarden addMyGarden(MyGarden myGarden) {
        if (myGarden == null) {
            return null;
        }

        final String sql = "insert into my_garden (planter_id, garden_name, bio, photo) " +
                "values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, myGarden.getPlanterId());
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
    @Transactional
    public boolean deleteById(int myGardenId) {
        jdbcTemplate.update("set sql_safe_updates = 0;");
        // delete replies
        final String sql = "delete r from reply r " +
                "inner join post p on r.post_id = p.post_id " +
                "inner join plant pl on p.plant_id = pl.plant_id " +
                "inner join my_garden g on pl.my_garden_id = g.my_garden_id " +
                "where g.my_garden_id = ?;";
        jdbcTemplate.update(sql, myGardenId);
        // delete posts
        final String sql2 = "delete p from post p " +
                "inner join plant pl on p.plant_id = pl.plant_id " +
                "inner join my_garden g on pl.my_garden_id = g.my_garden_id " +
                "where g.my_garden_id = ?;";
        jdbcTemplate.update(sql2, myGardenId);

        jdbcTemplate.update("set sql_safe_updates = 1;");

        jdbcTemplate.update("delete from plant where my_garden_id = ?;", myGardenId);
        return jdbcTemplate.update("delete from my_garden where my_garden_id = ?;", myGardenId) > 0;
    }

    private void addPlants(MyGarden myGarden) {
        final String sql = "select plant_id, my_garden_id, plant_description, photo, plant_name, plant_type, gotcha_date " +
                "from plant " +
                "where my_garden_id = ?;";
        var plants = jdbcTemplate.query(sql, new PlantMapper(), myGarden.getMyGardenId());
        myGarden.setPlants(plants);
    }
}
