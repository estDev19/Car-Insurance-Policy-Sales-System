package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @Column(name = "identificacion")
    private String identificacion;

    @Column(name = "clave")
    @JsonIgnore
    private String clave;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "correo")
    private String correo;

    @Column(name = "rol")
    private String rol;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    private MedioPago medio;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference
    List<Poliza> listaPolizas;

    public Usuario(String identificacion, String clave, String nombre, String telefono, String correo, String rol , List<Poliza> listaPolizas) {
        this.identificacion = identificacion;
        this.clave = clave;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.rol = rol;
        this.listaPolizas = listaPolizas;
    }

    public Usuario() {
    }

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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public MedioPago getMedio() {
        return medio;
    }

    public void setMedio(MedioPago medio) {
        this.medio = medio;
    }

    public List<Poliza> getListaPolizas() {
        return listaPolizas;
    }

    public void setListaPolizas(List<Poliza>  listaPolizas) {
        this. listaPolizas =  listaPolizas;
    }


}