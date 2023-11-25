package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "medio_pago")
public class MedioPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medio_pago")
    private Integer idMedio;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "codigo")
    private Integer ccv;

    @Column(name = "numero_tarjeta")
    private String numeroTarjeta;

    @Column(name = "fecha_año")
    private Integer fechaAnio;

    @Column(name = "fecha_mes")
    private Integer fechaMes;

    @OneToOne
    @JoinColumn(name = "usuario_identificacion")
    @JsonIgnore
    private Usuario usuario;

    public void setIdMedio(Integer idMedio) {
        this.idMedio = idMedio;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public int getIdMedio() {
        return idMedio;
    }

    public void setIdMedio(int idMedio) {
        this.idMedio = idMedio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCcv() {
        return ccv;
    }

    public void setCcv(Integer ccv) {
        this.ccv = ccv;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public int getFechaAnio() {
        return fechaAnio;
    }

    public void setFechaAnio(Integer fechaAnio) {
        this.fechaAnio = fechaAnio;
    }

    public Integer getFechaMes() {
        return fechaMes;
    }

    public void setFechaMes(Integer fechaMes) {
        this.fechaMes = fechaMes;
    }

    public MedioPago() {
    }

    public MedioPago(int idMedio, String nombre, Integer ccv, String numeroTarjeta, Integer fechaAnio, Integer fechaMes) {
        this.idMedio = idMedio;
        this.nombre = nombre;
        this.ccv = ccv;
        this.numeroTarjeta = numeroTarjeta;
        this.fechaAnio = fechaAnio;
        this.fechaMes = fechaMes;
    }

}