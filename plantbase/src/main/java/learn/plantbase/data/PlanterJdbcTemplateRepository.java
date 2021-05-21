package learn.plantbase.data;

import learn.plantbase.data.mappers.MyGardenMapper;
import learn.plantbase.data.mappers.PlanterMapper;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Planter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PlanterJdbcTemplateRepository implements PlanterRepository {

    private final JdbcTemplate jdbcTemplate;

    public PlanterJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Planter> findAll() {

        final String sql = "select planter_id, role_id, first_name, last_name, email "
                + "from planter;";

        return jdbcTemplate.query(sql, new PlanterMapper());
    }

    @Override

    public Planter findById(int planterId) {

        final String sql = "select planter_id, role_id, first_name, last_name, email "
                + "from user_profile "
                + "where planter_id = ?;";

        Planter planter = jdbcTemplate.query(sql, new PlanterMapper(), planterId).stream()
                .findFirst()
                .orElse(null);

//        if (user != null) {
//            addMyGarden(user);
//        }
        return planter;
    }

    @Override
    public Planter addPlanter(Planter planter) {

        if (planter == null) {
            return null;
        }


        final String sql = "insert into planter (role_id, first_name, last_name, email) "
                + "values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, planter.getRoleId());
            ps.setString(2, planter.getFirstName());
            ps.setString(3, planter.getLastName());
            ps.setString(4, planter.getEmail());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }


        planter.setPlanterId(keyHolder.getKey().intValue());

        return planter;
    }

    @Override
    public boolean editPlanter(Planter planter) {

        if (planter == null) {
            return false;
        }

        final String sql = "update planter set "
                + "first_name = ?, "
                + "last_name = ?, "
                + "email = ? "
                + "where planter_id = ?;";

        return jdbcTemplate.update(sql,
                planter.getFirstName(),
                planter.getLastName(),
                planter.getEmail(),
                planter.getPlanterId()) > 0;
    }

    @Override
    public boolean deleteById(int planterId) {


        jdbcTemplate.update("delete from reply where planter_id = ?;", planterId);
        jdbcTemplate.update("delete from post where planter_id = ?;", planterId);
        jdbcTemplate.update("delete from my_garden where planter_id = ?;", planterId);

        return jdbcTemplate.update(
                "delete from planter where planter_id = ?", planterId) > 0;
    }

//    private void addMyGarden(Planter user) {
//        final String sql = "select my_garden_id, user_id, garden_name, bio, photo from my_garden where user_id = ?;";
//
//        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), user.getUserId()).stream().findFirst().orElse(null);
//        user.setMyGarden(myGarden);
//    }
}
