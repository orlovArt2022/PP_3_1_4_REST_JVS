package ru.orlov.restjvs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.orlov.restjvs.model.User;


public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(String email);
}
