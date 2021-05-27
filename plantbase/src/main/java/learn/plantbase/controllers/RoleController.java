package learn.plantbase.controllers;


import learn.plantbase.domain.RoleService;
import learn.plantbase.models.Role;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/role")
public class RoleController {

    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Role> findAll() {
        return service.findAll();
    }

    @GetMapping("/{roleId}")
    public Role findByRoleId(@PathVariable int roleId) {
        return service.findByRoleId(roleId);
    }

}
