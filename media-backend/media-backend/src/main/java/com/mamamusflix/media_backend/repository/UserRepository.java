package com.mamamusflix.media_backend.repository;
import com.mamamusflix.media_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // Spring Data JPA will automatically implement basic CRUD methods
}