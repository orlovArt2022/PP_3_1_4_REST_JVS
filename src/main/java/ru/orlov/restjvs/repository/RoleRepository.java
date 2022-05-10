package ru.orlov.restjvs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.orlov.restjvs.model.Role;


import java.util.Optional;

public interface RoleRepository extends JpaRepository <Role, Long> {

    Optional<Role> findByName(String name);
}
