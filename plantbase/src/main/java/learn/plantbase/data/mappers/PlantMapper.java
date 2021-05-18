package learn.plantbase.data.mappers;

import learn.plantbase.models.Plant;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PlantMapper implements RowMapper<Plant> {


    @Override
    public Plant mapRow(ResultSet resultSet, int i) throws SQLException {
        Plant plant = new Plant();
        plant.setPlantId(resultSet.getInt("plant_id"));
        plant.setMyGardenId(resultSet.getInt("my_garden_id"));
        plant.setPlantDescription(resultSet.getString("plant_description"));
        plant.setPhoto(resultSet.getString("photo"));
        plant.setPlantName(resultSet.getString("plant_name"));
        plant.setPlantType(resultSet.getString("plant_type"));
        if (resultSet.getDate("gotcha_date") != null) {
            plant.setGotchaDate(resultSet.getDate("gotcha_date").toLocalDate());
        }
        return plant;
    }
}
