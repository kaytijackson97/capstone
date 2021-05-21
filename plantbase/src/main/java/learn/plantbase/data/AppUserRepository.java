package learn.plantbase.data;

import learn.plantbase.data.mappers.MyGardenMapper;
import learn.plantbase.data.mappers.PlanterMapper;
import learn.plantbase.models.AppUser;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Planter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class AppUserRepository {
    private final JdbcTemplate jdbcTemplate;

    public AppUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public AppUser findByUsername(String username) {
        final String sql = "select app_user_id, username, password_hash, disabled "
                + "from app_user "
                + "where username = ?;";

        AppUser user = jdbcTemplate.query(sql, this::map, username).stream().findFirst().orElse(null);

        if (user != null) {
            user.setRoles(getRolesByUserId(user.getAppUserId()));
            addPlanter(user);
            addMyGarden(user);
        }

        return user;
    }

    @Transactional
    public AppUser add(AppUser user) {
        final String sql = "insert into app_user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    private AppUser map(ResultSet rs, int rowId) throws SQLException {
        AppUser user = new AppUser();
        user.setAppUserId(rs.getInt("app_user_id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password_hash"));
        user.setDisabled(rs.getBoolean("disabled"));
        return user;
    }

    private List<String> getRolesByUserId(int userId) {
        final String sql = "select r.name "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "where ur.app_user_id = ?";

        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), userId);
    }

    private void updateRoles(AppUser user) {
        jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", user.getAppUserId());

        if (user.getRoles() == null) {
            return;
        }

        for (String roleName : user.getRoles()) {
            String sql = "insert into app_user_role (app_user_id, app_role_id) "
                    + "select ?, app_role_id from app_role where `name` = ?;";

            jdbcTemplate.update(sql, user.getAppUserId(), roleName);
        }
    }

    private void addPlanter(AppUser appUser) {
        final String sql ="select user_id, role_id, first_name, last_name, email " +
                "from user_profile " +
                "where user_id = ?;";

        Planter planter = jdbcTemplate.query(sql, new PlanterMapper(), appUser.getAppUserId()).stream().findFirst().orElse(null);
        appUser.setPlanter(planter);
    }

    private void addMyGarden(AppUser appUser) {
        final String sql = "select my_garden_id, user_id, garden_name, bio, photo from my_garden where user_id = ?;";

        MyGarden myGarden = jdbcTemplate.query(sql, new MyGardenMapper(), appUser.getAppUserId()).stream().findFirst().orElse(null);
        appUser.setMyGarden(myGarden);
    }
}
