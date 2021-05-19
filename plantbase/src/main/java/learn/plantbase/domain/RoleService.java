package learn.plantbase.domain;

import learn.plantbase.data.RoleRepository;
import learn.plantbase.models.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    public List<Role> findAll() {
        return repository.findAll();
    }

    public Role findByRoleId(int roleId) {
        return repository.findByRoleId(roleId);
    }

}
