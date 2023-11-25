package com.example.demo.dto;

import javax.validation.constraints.NotNull;

public class RegistrarCategoriaDto {

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;


    public String getNombre() {return nombre;}

    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getDescripcion() {return descripcion;}

    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
}
