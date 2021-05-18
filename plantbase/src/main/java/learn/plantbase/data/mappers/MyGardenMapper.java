package learn.plantbase.data.mappers;

import learn.plantbase.models.MyGarden;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MyGardenMapper implements RowMapper<MyGarden> {
    @Override
    public MyGarden mapRow(ResultSet resultSet, int i) throws SQLException {
        MyGarden myGarden = new MyGarden();
        myGarden.setMyGardenId(resultSet.getInt("my_garden_id"));
        myGarden.setUserId(resultSet.getInt("user_id"));
        myGarden.setGardenName(resultSet.getString("garden_name"));
        myGarden.setBio(resultSet.getString("bio"));
        myGarden.setPhoto(resultSet.getString("photo"));
        return myGarden;
    }
}
