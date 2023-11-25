package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Table(name = "cobertura")
@Entity
public class Cobertura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cobertura")
    private Integer idCobertura;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "costo_minimo")
    private Double costoMinimo;

    @Column(name = "costo_porcentual")
    private Double costoPorcentual;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    @JsonBackReference
    private Categoria categoria;

    public Integer getIdCobertura() {
        return idCobertura;
    }

    public void setIdCobertura(Integer idCobertura) {
        this.idCobertura = idCobertura;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getCostoMinimo() {
        return costoMinimo;
    }

    public void setCostoMinimo(Double costoMinimo) {
        this.costoMinimo = costoMinimo;
    }

    public Double getCostoPorcentual() {
        return costoPorcentual;
    }

    public void setCostoPorcentual(Double costoPorcentual) {
        this.costoPorcentual = costoPorcentual;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Cobertura() {
    }

    public Cobertura(String descripcion, Double costoMinimo, Double costoPorcentual, Categoria categoria) {
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
        this.categoria = categoria;
    }
}
