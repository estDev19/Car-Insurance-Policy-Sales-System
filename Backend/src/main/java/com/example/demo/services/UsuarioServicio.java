package com.example.demo.services;

import com.example.demo.dto.ActualizarUsuarioDto;
import com.example.demo.dto.ComprarPolizaDto;
import com.example.demo.dto.RegistrarUsuarioDto;
import com.example.demo.dto.UsuarioDto;
import com.example.demo.entities.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Calendar;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CoberturaRepository coberturaRepository;

    @Autowired
    private PolizaRepository polizaRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario validarUsuario(UsuarioDto usuarioDto) {

        Optional<Usuario> usuario = usuarioRepository.findByIdentificacion(usuarioDto.getIdentificacion());

        if(!usuario.isPresent())
            throw new IllegalArgumentException("Usuario no encontrado o contraseña incorrecta");

        if (!usuario.get().getClave().equals(usuarioDto.getClave())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }

        return usuario.get();
    }

    public Usuario registrarUsuario(RegistrarUsuarioDto registerDto) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByIdentificacion(registerDto.getIdentificacion());

        if (usuarioExistente.isPresent()) {
            throw new IllegalArgumentException("El usuario ya existe");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setIdentificacion(registerDto.getIdentificacion());
        nuevoUsuario.setClave(registerDto.getPassword());
        nuevoUsuario.setNombre(registerDto.getNombreCompleto());
        nuevoUsuario.setTelefono(registerDto.getTelefono());
        nuevoUsuario.setCorreo(registerDto.getEmail());
        nuevoUsuario.setRol("Usuario");

        MedioPago nuevoMedioPago = new MedioPago();
        nuevoMedioPago.setNombre(registerDto.getTarjetaNom());
        nuevoMedioPago.setCcv(registerDto.getCcv());
        nuevoMedioPago.setNumeroTarjeta(registerDto.getTarjetaNum());
        nuevoMedioPago.setFechaAnio(registerDto.getTarjetaanio());
        nuevoMedioPago.setFechaMes(registerDto.getTarjetaMes());
        nuevoMedioPago.setUsuario(nuevoUsuario);

        nuevoUsuario.setMedio(nuevoMedioPago);

        return usuarioRepository.save(nuevoUsuario);
    }

    public List<Marca> getAllMarcas() {
        return marcaRepository.findAll();
    }
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }
    public List<Cobertura> getAllCoberturas() {
        return coberturaRepository.findAll();
    }
    public List<Modelo> getAllModelos() {
        return modeloRepository.findAll();
    }
    public Usuario actualizarUsuario(ActualizarUsuarioDto actualizarUsuarioDto) {

        Optional<Usuario> usuario = usuarioRepository.findByIdentificacion(actualizarUsuarioDto.getIdentificacion());

        if(!usuario.isPresent())
            throw new IllegalArgumentException("Usuario no encontrado o contraseña incorrecta");

        if(actualizarUsuarioDto.getNombre() != null){
            usuario.get().setNombre(actualizarUsuarioDto.getNombre());
        }
        if(actualizarUsuarioDto.getEmail() != null){
            usuario.get().setCorreo(actualizarUsuarioDto.getEmail());
        }
        if(actualizarUsuarioDto.getTelefono() != null){
            usuario.get().setTelefono(actualizarUsuarioDto.getTelefono());
        }

        return usuarioRepository.save(usuario.get());
    }



    public Poliza comprarPoliza(ComprarPolizaDto comprarPolizaDto){

        Poliza polizaToAdd = new Poliza();

        Optional<Usuario> usuarioValidacion = usuarioRepository.findByIdentificacion(comprarPolizaDto.getIdUsuario());
        Optional<Modelo> modeloValidacion = modeloRepository.findById(comprarPolizaDto.getIdModelo());
        Optional<Cobertura> coberturaValidacion = coberturaRepository.findByIdCobertura(comprarPolizaDto.getIdCobertura());

        if (!usuarioValidacion.isPresent()) throw new IllegalArgumentException("El usuario no existe");
        if (!modeloValidacion.isPresent()) throw new IllegalArgumentException("El modelo no existe");
        if (!coberturaValidacion.isPresent()) throw new IllegalArgumentException("La cobertura no existe");

        polizaToAdd.setNumeroPlaca(comprarPolizaDto.getNumeroPlaca());
        polizaToAdd.setValorAsegurado(comprarPolizaDto.getValorAsegurado());
        polizaToAdd.setPlazo(comprarPolizaDto.getPlazo());
        polizaToAdd.setFechaCreacion(comprarPolizaDto.getFechaCreacion());
        polizaToAdd.setFechaVencimiento(comprarPolizaDto.getFechaVencimiento());

        polizaToAdd.setUsuario(usuarioValidacion.get());
        polizaToAdd.setModelo(modeloValidacion.get());
        polizaToAdd.setCobertura(coberturaValidacion.get());

        return polizaRepository.save(polizaToAdd);
    }

    public List<Poliza> polizasUsuario(String identificacion) {
        Optional<Usuario> usuario = usuarioRepository.findByIdentificacion(identificacion);

        if (!usuario.isPresent()) throw new IllegalArgumentException("El usuario no existe");

        List<Poliza> polizasUsuario = polizaRepository.findByUsuario(usuario.get());

        return polizasUsuario;

    }


}
