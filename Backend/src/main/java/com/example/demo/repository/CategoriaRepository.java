package com.example.demo.repository;

import com.example.demo.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository  extends JpaRepository<Categoria, Integer> {
    Optional<Categoria> findByNombre(String nombre);
    Optional<Categoria> findById(Integer id);
}
