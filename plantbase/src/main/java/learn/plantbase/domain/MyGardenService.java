package learn.plantbase.domain;

import learn.plantbase.data.MyGardenRepository;
import learn.plantbase.data.UserRepository;
import learn.plantbase.models.MyGarden;
import learn.plantbase.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyGardenService {
    final MyGardenRepository repository;
    private final UserRepository userRepository;

    public MyGardenService(MyGardenRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public List<MyGarden> findAll() { return repository.findAll(); }

    public MyGarden findById(int myGardenId) { return repository.findById(myGardenId); }

    public MyGarden findByUser(int userId) { return repository.findByUser(userId); }

    public Result<MyGarden> add(MyGarden myGarden) {
        Result<MyGarden> result = validate(myGarden);
        if (!result.isSuccess()) {
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
        boolean userExists = false;
        if (myGarden == null) {
            result.addMessage("myGarden cannot be null.", ResultType.INVALID);
            return result;
        }
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getUserId() == myGarden.getUserId()) {
                userExists = true;
            }
        }
        if (!userExists) {
            result.addMessage("myGarden must have an existing user attached.", ResultType.INVALID);
            return result;
        }
        return result;
    }
}