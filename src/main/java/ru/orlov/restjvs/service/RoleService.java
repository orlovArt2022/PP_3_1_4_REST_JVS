package ru.orlov.restjvs.service;

import ru.orlov.restjvs.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();

    void addRole(Role role);

    Role findByName(String name);
}
