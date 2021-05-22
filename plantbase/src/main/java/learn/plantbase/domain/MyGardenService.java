package learn.plantbase.domain;

import learn.plantbase.data.MyGardenRepository;
import learn.plantbase.data.PlanterRepository;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.Planter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyGardenService {
    final MyGardenRepository repository;
    private final PlanterRepository planterRepository;

    public MyGardenService(MyGardenRepository repository, PlanterRepository planterRepository) {
        this.repository = repository;
        this.planterRepository = planterRepository;
    }

    public List<MyGarden> findAll() { return repository.findAll(); }

    public MyGarden findById(int myGardenId) { return repository.findById(myGardenId); }

    public MyGarden findByPlanter(int planterId) { return repository.findByPlanter(planterId); }

    public Result<MyGarden> add(MyGarden myGarden) {
        Result<MyGarden> result = validate(myGarden);
        if (!result.isSuccess()) {
            result.addMessage("Not a valid myGarden.", ResultType.INVALID);
            return result;
        }
        if (myGarden.getMyGardenId() != 0) {
            result.addMessage("myGardenId cannot be set for 'add' to work.", ResultType.INVALID);
            return result;
        }
        myGarden = repository.addMyGarden(myGarden);
        result.setPayload(myGarden);
        return result;
    }

    public Result<MyGarden> edit(MyGarden myGarden) {
        Result<MyGarden> result = validate(myGarden);
        if (!result.isSuccess()) {
            return result;
        }
        if (myGarden.getMyGardenId() <= 0) {
            result.addMessage("myGardenId must be set for 'update' to work.", ResultType.INVALID);
            return result;
        }

        if (!repository.editMyGarden(myGarden)) {
            String msg = String.format("myGardenId: %s, not found,", myGarden.getMyGardenId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int myGardenId) {
        return repository.deleteById(myGardenId);
    }

    private Result<MyGarden> validate(MyGarden myGarden) {
        Result<MyGarden> result = new Result<>();
        boolean planterExists = false;
        if (myGarden == null) {
            result.addMessage("myGarden cannot be null.", ResultType.INVALID);
            return result;
        }
        List<Planter> planters = planterRepository.findAll();
        for (Planter planter : planters) {
            if (planter.getPlanterId() == myGarden.getPlanterId()) {
                planterExists = true;
            }
        }
        if (!planterExists) {
            result.addMessage("myGarden must have an existing planter attached.", ResultType.INVALID);
            return result;
        }
        return result;
    }
}
