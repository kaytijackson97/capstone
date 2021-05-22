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


    public Planter findByPlanter(String username) {
        return repository.findByUsername(username);
    }

    public Result<Planter> addPlanter(Planter planter) {
        Result<Planter> result = validate( planter);

        if (!result.isSuccess()) {
            return result;
        }

        // check for username duplicates


        planter = repository.addPlanter( planter);
        result.setPayload( planter);

        return result;
    }

    public Result<Planter> editPlanter(Planter planter) {
        Result<Planter> result = validate(planter);

        if (!result.isSuccess()) {
            return result;
        }

        // check for username duplicates


        if (!repository.editPlanter(planter)) {
            String msg = String.format("username: %s, not found", planter.getUserName());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }


    public boolean deleteByPlanter(String username) {
        return repository.deleteById(username);
    }

    private Result<Planter> validate(Planter planter) {
        Result<Planter> result = new Result<>();
        if (planter == null) {
            result.addMessage("planter cannot be null", ResultType.INVALID);
            return result;
        }

        List<Role> roles = roleRepository.findAll();
        boolean roleExists = roles.stream()
                .anyMatch(i -> i.getRoleId() == planter.getRoleId());

        if (!roleExists) {
            result.addMessage("invalid role id", ResultType.INVALID);
            return result;
        }

        if (planter.getEmail() != null) {
            String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
            Pattern pattern = Pattern.compile(emailRegex);
            Matcher matcher = pattern.matcher(planter.getEmail());

            if (!matcher.matches()) {
                result.addMessage("invalid email", ResultType.INVALID);
            }
        }

        return result;
    }
}
