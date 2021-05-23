package learn.plantbase.data.mappers;

import learn.plantbase.models.Planter;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PlanterMapper implements RowMapper<Planter> {

    @Override
    public Planter mapRow(ResultSet resultSet, int i) throws SQLException {
        Planter planter = new Planter();
        planter.setUsername(resultSet.getString("username"));
        planter.setRoleId(resultSet.getInt("role_id"));
        planter.setFirstName(resultSet.getString("first_name"));
        planter.setLastName(resultSet.getString("last_name"));
        planter.setEmail(resultSet.getString("email"));
        return planter;
    }
}
