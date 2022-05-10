package ru.orlov.restjvs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.orlov.restjvs.model.Role;
import ru.orlov.restjvs.service.RoleService;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RestRoleController {

    @Autowired
    RoleService roleService;

    @GetMapping()
    public List<Role> showAllUsers() {
        return roleService.getAllRoles();
    }

    @GetMapping("{name}")
    public Role getSingleUsers(@PathVariable String name) {
        return roleService.findByName(name);
    }

}
