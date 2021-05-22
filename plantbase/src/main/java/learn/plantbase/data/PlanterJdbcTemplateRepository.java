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
import java.util.Objects;

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

    public Planter findByUsername(String username) {

        final String sql = "select planter_id, username, role_id, first_name, last_name, email "
                + "from planter "
                + "where username = ?;";

        Planter planter = jdbcTemplate.query(sql, new PlanterMapper(), username).stream()
                .findFirst()
                .orElse(null);

        if (planter != null) {
            addMyGarden(planter);
        }
        return planter;
    }

    @Override
    public Planter addPlanter(Planter planter) {

        if (planter == null) {
            return null;
        }


        final String sql = "insert into planter (username, role_id, first_name, last_name, email) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, planter.getUserName());
            ps.setInt(2, planter.getRoleId());
            ps.setString(3, planter.getFirstName());
            ps.setString(4, planter.getLastName());
            ps.setString(5, planter.getEmail());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }


        planter.setUserName(Objects.requireNonNull(keyHolder.getKey()).toString());

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
                + "where username = ?;";

        return jdbcTemplate.update(sql,
                planter.getFirstName(),
                planter.getLastName(),
                planter.getEmail(),
                planter.getUserName()) > 0;
    }

    @Override
    public boolean deleteByUsername(String username) {


        jdbcTemplate.update("delete from reply where username = ?;", username);
        jdbcTemplate.update("delete from post where username = ?;", username);
        jdbcTemplate.update("delete from my_garden where username = ?;", username);

        return jdbcTemplate.update(
                "delete from planter where username = ?", username) > 0;
    }

    private void addMyGarden(Planter planter) {
        final String sql = "select my_garden_id, username, garden_name, bio, photo from my_garden where username = ?;";

        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), planter.getUserName()).stream().findFirst().orElse(null);
        planter.setMyGarden(myGarden);
    }
}
