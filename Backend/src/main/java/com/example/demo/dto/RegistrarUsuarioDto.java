package com.example.demo.dto;

import javax.validation.constraints.NotNull;

public class RegistrarUsuarioDto {

    @NotNull
    private String identificacion;

    @NotNull
    private String nombreCompleto;

    @NotNull
    private String telefono;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String tarjetaNom;

    @NotNull
    private String tarjetaNum;

    @NotNull
    private Integer tarjetaanio;

    @NotNull
    private Integer tarjetaMes;

    @NotNull
    private Integer ccv;

    public RegistrarUsuarioDto() {
    }

    public RegistrarUsuarioDto(String identificacion, String nombreCompleto, String telefono, String email,
                              String password, String tarjetaNom, String tarjetaNum, Integer tarjetaanio, Integer tarjetaMes, Integer ccv) {
        this.identificacion = identificacion;
        this.nombreCompleto = nombreCompleto;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.tarjetaNom = tarjetaNom;
        this.tarjetaNum = tarjetaNum;
        this.tarjetaanio = tarjetaanio;
        this.tarjetaMes = tarjetaMes;
        this.ccv = ccv;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTarjetaNom() {
        return tarjetaNom;
    }

    public void setTarjetaNom(String tarjetaNom) {
        this.tarjetaNom = tarjetaNom;
    }

    public String getTarjetaNum() {
        return tarjetaNum;
    }

    public void setTarjetaNum(String tarjetaNum) {
        this.tarjetaNum = tarjetaNum;
    }

    public Integer getTarjetaanio() {
        return tarjetaanio;
    }

    public void setTarjetaanio(Integer tarjetaanio) {
        this.tarjetaanio = tarjetaanio;
    }

    public Integer getTarjetaMes() {
        return tarjetaMes;
    }

    public void setTarjetaMes(Integer tarjetaMes) {
        this.tarjetaMes = tarjetaMes;
    }

    public Integer getCcv() {
        return ccv;
    }

    public void setCcv(Integer ccv) {
        this.ccv = ccv;
    }
}

