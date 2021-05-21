package learn.plantbase.data.mappers;

import learn.plantbase.models.Planter;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PlanterMapper implements RowMapper<Planter> {


    @Override
    public Planter mapRow(ResultSet resultSet, int i) throws SQLException {
        Planter user = new Planter();
        user.setUserId(resultSet.getInt("planter_id"));
        user.setRoleId(resultSet.getInt("role_id"));
        user.setFirstName(resultSet.getString("first_name"));
        user.setLastName(resultSet.getString("last_name"));
        user.setEmail(resultSet.getString("email"));
        return user;
    }
}
