package com.example.demo.controller;

import com.example.demo.dto.RegistrarCategoriaDto;
import com.example.demo.dto.RegistrarCoberturaDto;
import com.example.demo.dto.RegistrarModeloDto;
import com.example.demo.dto.UsuarioDto;
import com.example.demo.entities.*;
import com.example.demo.services.AdministradorServicio;
import com.example.demo.services.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/administrador")
public class AdministradorController {

    @Autowired
    private AdministradorServicio administradorServicio;

    @PostMapping("/registrarMarca")
    public ResponseEntity<?> registrarMarca(@RequestBody String nombreMarca) {
        try {
            Marca marca = administradorServicio.registrarMarcas(nombreMarca);
            return ResponseEntity.ok(marca);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/registrarModelo")
    public ResponseEntity<?> registrarModelo(@ModelAttribute("registrarModeloDto") @Valid RegistrarModeloDto registrarModeloDto,
                                             @RequestPart("imagen") MultipartFile imagen) {
        try {
            Modelo modelo = administradorServicio.registrarModelos(registrarModeloDto, imagen);
            return ResponseEntity.ok(modelo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/registrarCategoria")
    public ResponseEntity<?> registrarCategoria(@ModelAttribute("registrarCategoriaDto") @Valid RegistrarCategoriaDto registrarCategoriaDto) {
        try {
            Categoria categoria = administradorServicio.registrarCategorias(registrarCategoriaDto);
            return ResponseEntity.ok(categoria);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PostMapping("/registrarCobertura")
    public ResponseEntity<?> registrarCobertura(@ModelAttribute("registrarCoberturaDto") @Valid RegistrarCoberturaDto registrarCoberturaDto) {
        try {
            Cobertura cobertura = administradorServicio.registrarCoberturas(registrarCoberturaDto);
            return ResponseEntity.ok(cobertura);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
