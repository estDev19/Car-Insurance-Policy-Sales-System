package com.example.demo.repository;

import com.example.demo.entities.Categoria;
import com.example.demo.entities.Cobertura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoberturaRepository  extends JpaRepository<Cobertura, Integer> {
    Optional<Cobertura> findByDescripcion(String nombre);
    Optional<Cobertura> findByDescripcionAndCategoria(String descripcion, Categoria categoria);
    Optional<Cobertura> findByIdCobertura(Integer idCobertura);

}
