package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Integer idCategoria;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "categoria")
    @JsonManagedReference
    private List<Cobertura> listaCoberturas;

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Cobertura> getListaCoberturas() {
        return listaCoberturas;
    }

    public void setListaCoberturas(List<Cobertura> listaCoberturas) {
        this.listaCoberturas = listaCoberturas;
    }

    public Categoria(String descripcion, String nombre, List<Cobertura> listaCoberturas) {
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.listaCoberturas = listaCoberturas;
    }

    public Categoria() {
    }
}
