package learn.plantbase.data;

import learn.plantbase.models.MyGarden;

import java.util.List;

public interface MyGardenRepository {
    public List<MyGarden> findAll();

    public MyGarden findById(int myGardenId);

    public MyGarden findByPlanter(String username);

    public MyGarden addMyGarden(MyGarden myGarden);

    public boolean editMyGarden(MyGarden myGarden);

    public boolean deleteById(int myGardenId);
}
