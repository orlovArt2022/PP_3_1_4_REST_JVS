package ru.orlov.restjvs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.orlov.restjvs.model.AppUserRoles;
import ru.orlov.restjvs.model.Role;
import ru.orlov.restjvs.model.User;
import ru.orlov.restjvs.service.RoleService;
import ru.orlov.restjvs.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class RestUserController {
    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostConstruct
    void init() {
        Arrays.stream(AppUserRoles.values())
                .map(x -> x.toString())
                .forEach(x -> roleService.addRole(new Role(x)));

        User startUser = new User("admin", "admin", 30, "admin", "admin");
        startUser.addRoleToUser(roleService.findByName("ROLE_ADMIN"));
        startUser.addRoleToUser(roleService.findByName("ROLE_USER"));
        userService.addUser(startUser);

        User startUser2 = new User("user", "userov", 20, "user", "user");
        startUser2.addRoleToUser(roleService.findByName("ROLE_USER"));
        userService.addUser(startUser2);

        User startUser3 = new User("1", "1", 25, "1", "1");
        startUser3.addRoleToUser(roleService.findByName("ROLE_ADMIN"));
        userService.addUser(startUser3);

        User startUser4 = new User("Stephen", "Fry", 50, "2", "2");
        startUser4.addRoleToUser(roleService.findByName("ROLE_ADMIN"));
        startUser4.addRoleToUser(roleService.findByName("ROLE_USER"));
        userService.addUser(startUser4);
    }

    @GetMapping()
    public List<User> showAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public User getSingleUsers(@PathVariable Long id) {
        return userService.getByIdUser(id);
    }

    @PostMapping()
    public User addNewUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @PutMapping("{id}")
    public User editUser(@RequestBody User newUser) {
        userService.editUser(newUser);
        return newUser;
    }

    @DeleteMapping("{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User with ID " + id + " was successfully deleted";
    }

    @GetMapping("authentication")
    public User getSingleUsers(Authentication authentication) {
        return userService.findByEmail(authentication.getName());
    }
}
