package com.example.demo.controller;

import com.example.demo.dto.ActualizarUsuarioDto;
import com.example.demo.dto.ComprarPolizaDto;
import com.example.demo.dto.RegistrarUsuarioDto;
import com.example.demo.dto.UsuarioDto;
import com.example.demo.entities.*;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.services.UsuarioServicio;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioServicio.getAllUsuarios();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UsuarioDto usuarioDTO) {
        try {
            Usuario usuario = usuarioServicio.validarUsuario(usuarioDTO);
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegistrarUsuarioDto usuarioDto) {
        try {
            Usuario usuario = usuarioServicio.registrarUsuario(usuarioDto);
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/obtenerMarcas")
    public List<Marca> getAllModelos() {
        return usuarioServicio.getAllMarcas();
    }

    @GetMapping("/obtenerCategorias")
    public List<Categoria> getAllCategorias() {
        return usuarioServicio.getAllCategorias();
    }

    @GetMapping("/obtenerModelos")
    public List<Modelo> getAllModelos1() { return usuarioServicio.getAllModelos();}

    @GetMapping("/obtenerCoberturas")
    public List<Cobertura> getAllCoberturas() { return usuarioServicio.getAllCoberturas();}

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizar(@RequestBody @Valid ActualizarUsuarioDto usuarioDto) {
        try {
            Usuario usuario = usuarioServicio.actualizarUsuario(usuarioDto);
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/comprarPoliza")
    public ResponseEntity<?> comprarPoliza(@RequestBody @Valid ComprarPolizaDto polizaDto){
        try{
            Poliza poliza = usuarioServicio.comprarPoliza(polizaDto);
            return ResponseEntity.ok(poliza);
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }



    @GetMapping("/obtenerPolizasUsuario")
    public ResponseEntity<?> obtenerPolizasUsuario(@RequestParam @Valid String identificacion) {
        try{
            System.out.println(identificacion);
            List<Poliza> poliza =  usuarioServicio.polizasUsuario(identificacion);
            return ResponseEntity.ok(poliza);
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


}
