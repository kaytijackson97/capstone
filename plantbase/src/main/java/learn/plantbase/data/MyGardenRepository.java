package learn.plantbase.data;

import learn.plantbase.models.MyGarden;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MyGardenRepository {
    List<MyGarden> findAll();

    MyGarden findById(int myGardenId);

    MyGarden findByPlanter(String username);

    MyGarden addMyGarden(MyGarden myGarden);

    boolean editMyGarden(MyGarden myGarden);

    @Transactional
    boolean deleteById(int myGardenId);
}
