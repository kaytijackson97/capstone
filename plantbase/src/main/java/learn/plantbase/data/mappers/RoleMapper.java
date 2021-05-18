package learn.plantbase.data.mappers;

import learn.plantbase.models.Role;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoleMapper implements RowMapper<Role> {


    @Override
    public Role mapRow(ResultSet resultSet, int i) throws SQLException {
        Role role = new Role();
        role.setRoleId(resultSet.getInt("role_id"));
        role.setRoleName(resultSet.getString("role_name"));
        return role;
    }
}
