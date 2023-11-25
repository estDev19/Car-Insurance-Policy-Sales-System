package com.example.demo.dto;

import javax.validation.constraints.NotNull;

public class ActualizarUsuarioDto {

    @NotNull
    private String identificacion;

    private String nombre;

    private String telefono;

    private String email;

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ActualizarUsuarioDto(String identificacion, String nombre, String telefono, String email) {
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }

    public ActualizarUsuarioDto() {
    }
}
