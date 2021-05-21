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

        final String sql = "select user_id, role_id, first_name, last_name, email "
                + "from user_profile;";

        return jdbcTemplate.query(sql, new PlanterMapper());
    }

    @Override
    public Planter findByUser(int userId) {

        final String sql = "select user_id, role_id, first_name, last_name, email "
                + "from user_profile "
                + "where user_id = ?;";

        Planter user = jdbcTemplate.query(sql, new PlanterMapper(), userId).stream()
                .findFirst()
                .orElse(null);

//        if (user != null) {
//            addMyGarden(user);
//        }
        return user;
    }

    @Override
    public Planter addUser(Planter user) {

        if (user == null) {
            return null;
        }

        final String sql = "insert into user_profile (role_id, first_name, last_name, email)"
                + "values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, user.getRoleId());
            ps.setString(2, user.getFirstName());
            ps.setString(3, user.getLastName());
            ps.setString(4, user.getEmail());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    public boolean editUser(Planter user) {

        if (user == null) {
            return false;
        }

        final String sql = "update user_profile set "
                + "first_name = ?, "
                + "last_name = ?, "
                + "email = ? "
                + "where user_id = ?;";

        return jdbcTemplate.update(sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUserId()) > 0;
    }

    @Override
    public boolean deleteByUser(int userId) {

        jdbcTemplate.update("delete from reply where user_id = ?;", userId);
        jdbcTemplate.update("delete from post where user_id = ?;", userId);
        jdbcTemplate.update("delete from my_garden where user_id = ?;", userId);

        return jdbcTemplate.update(
                "delete from user_profile where user_id = ?", userId) > 0;
    }

//    private void addMyGarden(Planter user) {
//        final String sql = "select my_garden_id, user_id, garden_name, bio, photo from my_garden where user_id = ?;";
//
//        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), user.getUserId()).stream().findFirst().orElse(null);
//        user.setMyGarden(myGarden);
//    }
}
