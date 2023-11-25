package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;


@Table(name = "modelo")
@Entity
public class Modelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_modelo")
    private Integer idModelo;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_marca")
    @JsonBackReference
    private Marca marca;

    @Column(name = "año")
    private Integer fechaAnio;

    @Column(name = "imagen")
    private byte[] imagen;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Integer getFechaAnio() {
        return fechaAnio;
    }

    public void setFechaAnio(Integer fechaAnio) {
        this.fechaAnio = fechaAnio;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public Integer getIdModelo() {
        return idModelo;
    }

    public void setIdModelo(Integer idModelo) {
        this.idModelo = idModelo;
    }

    public Modelo() {
    }

    public Modelo(String nombre, Marca marca, Integer fechaAnio, byte[] imagen) {
        this.nombre = nombre;
        this.marca = marca;
        this.fechaAnio = fechaAnio;
        this.imagen = imagen;
    }
}
