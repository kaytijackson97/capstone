package learn.plantbase.data;

import learn.plantbase.models.Plant;

import java.util.List;

public interface PlantRepository {
    public List<Plant> findAll();

    public Plant findByPlantId(int postId);

    public List<Plant> findByGardenId(int myGardenId);

    public Plant addPlant(Plant plant);

    public boolean editPlant(Plant plant);

    public boolean deleteById(int plantId);
}
