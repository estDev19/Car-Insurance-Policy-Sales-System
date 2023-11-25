package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Table(name = "poliza")
@Entity
public class Poliza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_poliza")
    private Integer idPoliza;

    @Column(name = "numero_placa")
    private String numeroPlaca;

    @Column(name = "valor_asegurado")
    private Double valorAsegurado;

    @Column(name = "plazo")
    private String plazo;

    @Column(name = "fecha_creacion")
    private Timestamp fechaCreacion;

    @Column(name = "fecha_vencimiento")
    private Timestamp fechaVencimiento;

    @ManyToOne
    @JoinColumn(name = "usuario_identificacion", referencedColumnName = "identificacion")
    @JsonBackReference
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "modelo_id_modelo", referencedColumnName = "id_modelo")
    private Modelo modelo;

    @ManyToOne
    @JoinColumn(name = "cobertura_id_cobertura", referencedColumnName = "id_cobertura")
    private Cobertura cobertura;

    @Transient
    private Double precioCalculado;

    @PostLoad
    @PostPersist
    @PostUpdate
    public void updatePrecioCalculadoOnLoad() {
        precioCalculado = 0d;

        if (cobertura != null) {
            Double precioPorcentual = valorAsegurado * (cobertura.getCostoPorcentual() / 100);
            precioCalculado = precioPorcentual > cobertura.getCostoMinimo() ? precioPorcentual : cobertura.getCostoMinimo();
        }

    }

    public Double getPrecioCalculado() {
        return precioCalculado;
    }

    public void setPrecioCalculado(Double precioCalculado) {
        this.precioCalculado = precioCalculado;
    }

    public Integer getIdPoliza() {
        return idPoliza;
    }

    public void setIdPoliza(Integer idPoliza) {
        this.idPoliza = idPoliza;
    }

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

    public void setFechaCreacion(Timestamp fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Timestamp getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Timestamp fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public Cobertura getCobertura() {
        return cobertura;
    }

    public void setCobertura(Cobertura cobertura) {
        this.cobertura = cobertura;
    }

    public Poliza() {
    }

    public Poliza(String numeroPlaca, Double valorAsegurado, String plazo, Timestamp fechaCreacion, Timestamp fechaVencimiento, Usuario usuario, Modelo modelo, Cobertura cobertura) {
        this.numeroPlaca = numeroPlaca;
        this.valorAsegurado = valorAsegurado;
        this.plazo = plazo;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
        this.usuario = usuario;
        this.modelo = modelo;
        this.cobertura = cobertura;
    }
}
