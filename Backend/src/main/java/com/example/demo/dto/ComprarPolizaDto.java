package com.example.demo.dto;

import com.example.demo.entities.Cobertura;
import com.example.demo.entities.Modelo;
import com.example.demo.entities.Usuario;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

public class ComprarPolizaDto {


    @NotNull
    String numeroPlaca;
    @NotNull
    Double valorAsegurado;
    @NotNull
    String plazo;
    @NotNull
    Timestamp fechaCreacion;
    @NotNull
    Timestamp fechaVencimiento;
    @NotNull
    String idUsuario;
    @NotNull
    Integer idModelo;
    @NotNull
    Integer idCobertura;



    public String getNumeroPlaca() {
        return numeroPlaca;
    }

    public void setNumeroPlaca(String numeroPlaca) {
        this.numeroPlaca = numeroPlaca;
    }

    public Double getValorAsegurado() {
        return valorAsegurado;
    }

    public void setValorAsegurado(Double valorAsegurado) {
        this.valorAsegurado = valorAsegurado;
    }

    public String getPlazo() {
        return plazo;
    }

    public void setPlazo(String plazo) {
        this.plazo = plazo;
    }

    public Timestamp getFechaCreacion() {
        return fechaCreacion;
    }

    public Timestamp getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Timestamp fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public void setFechaCreacion(Timestamp fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdModelo() {
        return idModelo;
    }

    public void setIdModelo(Integer idModelo) {
        this.idModelo = idModelo;
    }

    public Integer getIdCobertura() {
        return idCobertura;
    }

    public void setIdCobertura(Integer idCobertura) {
        this.idCobertura = idCobertura;
    }

}
