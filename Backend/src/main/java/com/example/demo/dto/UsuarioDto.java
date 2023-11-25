package com.example.demo.dto;


import javax.validation.constraints.NotNull;

public class UsuarioDto {

    @NotNull
    private  String identificacion;

    @NotNull
    private String clave;

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public UsuarioDto() {
    }
}
