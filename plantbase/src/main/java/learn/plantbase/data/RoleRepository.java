package learn.plantbase.data;

import learn.plantbase.models.Role;

import java.util.List;

public interface RoleRepository {

    List<Role> findAll();

    Role findByRoleId(int roleId);

}
