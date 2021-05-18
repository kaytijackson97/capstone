package learn.plantbase.data;

import learn.plantbase.data.mappers.RoleMapper;
import learn.plantbase.data.mappers.UserMapper;
import learn.plantbase.models.Role;
import learn.plantbase.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleJdbcTemplateRepository implements RoleRepository{

    private final JdbcTemplate jdbcTemplate;

    public RoleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {

        final String sql = "select user_id, role_id, first_name, last_name, email "
                + "from user_profile limit 1000;";

        return jdbcTemplate.query(sql, new UserMapper());
    }

    @Override
    public Role findByRoleId(int roleId) {

        final String sql = "select role_id, role_name "
                + "from plantbase_role "
                + "where role_id = ?;";

        return jdbcTemplate.query(sql, new RoleMapper(), roleId).stream()
                .findFirst()
                .orElse(null);
    }
}
