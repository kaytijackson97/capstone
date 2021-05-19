package learn.plantbase.domain;

import learn.plantbase.data.PlantRepository;
import learn.plantbase.models.Plant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantService {

    private final PlantRepository repository;

    public PlantService(PlantRepository repository) {
        this.repository = repository;
    }

    public List<Plant> findAll() { return repository.findAll(); }

    public List<Plant> findByMyGardenId(int myGardenId) { return repository.findByMyGardenId(myGardenId); }

    public Plant findById(int plantId) { return repository.findByPlantId(plantId); }

    public Result<Plant> add(Plant plant) {
        Result<Plant> result = validate(plant);
        if (!result.isSuccess()) {
            return result;
        }
        if (plant.getPlantId() != 0) {
            result.addMessage("plantId cannot be set for 'add' to work.", ResultType.INVALID);
            return result;
        }
        plant = repository.addPlant(plant);
        result.setPayload(plant);
        return result;
    }

    public Result<Plant> edit(Plant plant) {
        Result<Plant> result = validate(plant);
        if (!result.isSuccess()) {
            return result;
        }
        if (plant.getPlantId() <= 0) {
            result.addMessage("plantId must be set for 'update' to work.", ResultType.INVALID);
            return result;
        }
        if (!repository.editPlant(plant)) {
            String msg = String.format("plantId: %s not found", plant.getPlantId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int plantId) { return repository.deleteById(plantId); }

    private Result<Plant> validate(Plant plant) {
        Result<Plant> result = new Result<>();
        if (plant == null) {
            result.addMessage("plant cannot be null", ResultType.INVALID);
            return result;
        }
        return result;
    }


}
