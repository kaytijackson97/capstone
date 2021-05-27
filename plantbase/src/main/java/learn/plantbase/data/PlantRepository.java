package learn.plantbase.data;

import learn.plantbase.models.Plant;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PlantRepository {
    List<Plant> findAll();

    Plant findByPlantId(int postId);

    List<Plant> findByMyGardenId(int myGardenId);

    Plant addPlant(Plant plant);

    boolean editPlant(Plant plant);

    @Transactional
    boolean deleteById(int plantId);
}
