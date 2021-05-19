package learn.plantbase.data;

import learn.plantbase.models.Plant;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PlantRepository {
    public List<Plant> findAll();

    public Plant findByPlantId(int postId);

    public List<Plant> findByMyGardenId(int myGardenId);

    public Plant addPlant(Plant plant);

    public boolean editPlant(Plant plant);

    @Transactional
    public boolean deleteById(int plantId);
}
