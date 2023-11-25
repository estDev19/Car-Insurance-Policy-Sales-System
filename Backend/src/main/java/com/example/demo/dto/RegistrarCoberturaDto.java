package com.example.demo.dto;

import javax.validation.constraints.NotNull;

public class RegistrarCoberturaDto {
    @NotNull
    String descripcion;

    @NotNull
    Double costoMinimo;

    @NotNull
    Double costoPorcentual;

    @NotNull
    Integer categoriaID;

    public Integer getCategoriaID() {return categoriaID;}
    public void setCategoriaID(Integer categoriaID) {this.categoriaID = categoriaID;}
    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
    public Double getCostoMinio() {return costoMinimo;}
    public void setCostoMinimo(Double costoMinimo) {this.costoMinimo = costoMinimo;}
    public Double getCostoPorcentual() {return costoPorcentual;}
    public void setCostoPorcentual(Double costoPorcentual) {this.costoPorcentual = costoPorcentual;}
}
