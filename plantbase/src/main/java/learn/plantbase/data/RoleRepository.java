package learn.plantbase.data;

import learn.plantbase.models.Role;
import learn.plantbase.models.User;

import java.util.List;

public interface RoleRepository {

    List<User> findAll();

    Role findByRoleId(int roleId);

}
