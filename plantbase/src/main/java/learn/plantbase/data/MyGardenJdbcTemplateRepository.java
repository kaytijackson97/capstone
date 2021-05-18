package learn.plantbase.data;

import learn.plantbase.models.MyGarden;

import java.util.List;

public class MyGardenJdbcTemplateRepository implements MyGardenRepository {
    @Override
    public List<MyGarden> findAll() {
        return null;
    }

    @Override
    public MyGarden findById(int myGardenId) {
        return null;
    }

    @Override
    public MyGarden findByUser(int userId) {
        return null;
    }

    @Override
    public MyGarden addMyGarden(MyGarden myGarden) {
        return null;
    }

    @Override
    public boolean editMyGarden(int myGardenId) {
        return false;
    }

    @Override
    public boolean deleteById(int myGardenId) {
        return false;
    }
}
