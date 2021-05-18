package learn.plantbase.data.mappers;

import learn.plantbase.models.Garden;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GardenMapper implements RowMapper<Garden> {

    @Override
    public Garden mapRow(ResultSet resultSet, int i) throws SQLException {
        Garden garden = new Garden();
        garden.setGardenId(resultSet.getInt("garden_id"));
        return garden;
    }
}
