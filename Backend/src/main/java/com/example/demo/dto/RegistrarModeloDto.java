package com.example.demo.dto;

import javax.validation.constraints.NotNull;

public class RegistrarModeloDto {

    @NotNull
    private String nombre;

    @NotNull
    private Integer marcaId;

    @NotNull
    private Integer año;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getMarcaId() {
        return marcaId;
    }

    public void setMarcaId(Integer marcaId) {
        this.marcaId = marcaId;
    }

    public Integer getAño() {
        return año;
    }

    public void setAño(Integer año) {
        this.año = año;
    }
}
