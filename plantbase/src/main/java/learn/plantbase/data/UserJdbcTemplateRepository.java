package learn.plantbase.data;

import learn.plantbase.data.mappers.PostMapper;
import learn.plantbase.data.mappers.UserMapper;
import learn.plantbase.models.Post;
import learn.plantbase.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Post> findAll() {

        final String sql = "select post_id, user_id, plant_id, garden_id, caption, photo, datetime_posted, like_count "
            + "from post limit 1000;";

        return jdbcTemplate.query(sql, new PostMapper());
    }

    @Override
    public User findByUser(int userId) {

        final String sql = "select user_id, role_id, first_name, last_name, email "
                + "from user_profile "
                + "where user_id = ?;";

        return jdbcTemplate.query(sql, new UserMapper(), userId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public User addUser(User user) {

        final String sql = "insert into user_profile (role_id, first_name, last_name, email)"
                + "values (?,?,?,?);";

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
    public boolean editUser(User user) {

        final String sql = "update user_profile set "
                + "role_id = ?, "
                + "first_name = ?, "
                + "last_name = ?, "
                + "email = ? "
                + "where user_id = ?;";

        return jdbcTemplate.update(sql,
                user.getRoleId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUserId()) > 0;
    }

    @Override
    public boolean deleteByUser(int userId) {
        return jdbcTemplate.update(
                "delete from user_profile where user_id = ?", userId) > 0;
    }
}
