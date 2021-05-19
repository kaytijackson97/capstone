package learn.plantbase.domain;

import learn.plantbase.data.RoleRepository;
import learn.plantbase.data.UserRepository;
import learn.plantbase.models.Role;
import learn.plantbase.models.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository repository, RoleRepository roleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findByUser(int userId) {
        return repository.findByUser(userId);
    }

    public Result<User> addUser(User user) {
        Result<User> result = validate(user);

        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() !=0) {
            result.addMessage("userId cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        user = repository.addUser(user);
        result.setPayload(user);
        return result;
    }

    public Result<User> editUser(User user) {
        Result<User> result = validate(user);

        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() <= 0) {
            result.addMessage("userId must be set for 'edit' operation", ResultType.INVALID);
            return result;
        }

        if (!repository.editUser(user)) {
            String msg = String.format("userId: %s, not found", user.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteByUser(int userId) {
        return repository.deleteByUser(userId);
    }

    private Result<User> validate(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        List<Role> roles = roleRepository.findAll();
        boolean roleExists = roles.stream()
                .anyMatch(i -> i.getRoleId() == user.getRoleId());

        if (!roleExists) {
            result.addMessage("Invalid role id", ResultType.INVALID);
            return result;
        }

        if (user.getFirstName().isBlank()) {
            result.addMessage("firstName is required", ResultType.INVALID);
        }

        if (user.getLastName().isBlank()) {
            result.addMessage("lastName is required", ResultType.INVALID);
        }

        if (user.getEmail().isBlank()) {
            result.addMessage("email is required", ResultType.INVALID);
        }

        return result;
    }
}
