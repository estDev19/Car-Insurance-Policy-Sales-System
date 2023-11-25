package com.example.demo.repository;

import com.example.demo.entities.Marca;
import com.example.demo.entities.Modelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Integer> {

    Optional<Modelo> findByNombreAndMarca(String nombre, Marca marca);
}
