package learn.plantbase.domain;

import learn.plantbase.data.RoleRepository;
import learn.plantbase.data.PlanterRepository;
import learn.plantbase.models.Role;
import learn.plantbase.models.Planter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PlanterService {

    private final PlanterRepository repository;
    private final RoleRepository roleRepository;

    public PlanterService(PlanterRepository repository, RoleRepository roleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    public List<Planter> findAll() {
        return repository.findAll();
    }

    public Planter findByUser(int userId) {
        return repository.findByUser(userId);
    }

    public Result<Planter> addUser(Planter user) {
        Result<Planter> result = validate(user);

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

    public Result<Planter> editUser(Planter user) {
        Result<Planter> result = validate(user);

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

    private Result<Planter> validate(Planter user) {
        Result<Planter> result = new Result<>();
        if (user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        List<Role> roles = roleRepository.findAll();
        boolean roleExists = roles.stream()
                .anyMatch(i -> i.getRoleId() == user.getRoleId());

        if (!roleExists) {
            result.addMessage("invalid role id", ResultType.INVALID);
            return result;
        }

        if (user.getEmail() != null) {
            String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
            Pattern pattern = Pattern.compile(emailRegex);
            Matcher matcher = pattern.matcher(user.getEmail());

            if (!matcher.matches()) {
                result.addMessage("invalid email", ResultType.INVALID);
            }
        }

        return result;
    }
}
