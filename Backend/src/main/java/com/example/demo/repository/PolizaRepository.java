package com.example.demo.repository;

import com.example.demo.entities.*;
import com.example.demo.entities.Marca;
import com.example.demo.entities.Modelo;
import com.example.demo.entities.Poliza;
import com.example.demo.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolizaRepository  extends JpaRepository<Poliza, Integer> {
    
    Optional<Poliza> getPolizaByCobertura(Cobertura cobertura);

    List<Poliza> findByUsuario(Usuario usuario);

}
