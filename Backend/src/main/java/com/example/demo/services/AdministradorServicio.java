package com.example.demo.services;

import com.example.demo.dto.RegistrarCategoriaDto;
import com.example.demo.dto.RegistrarCoberturaDto;
import com.example.demo.dto.RegistrarModeloDto;
import com.example.demo.entities.Categoria;
import com.example.demo.entities.Cobertura;
import com.example.demo.entities.Marca;
import com.example.demo.entities.Modelo;
import com.example.demo.repository.MarcaRepository;
import com.example.demo.repository.ModeloRepository;
import com.example.demo.repository.CoberturaRepository;
import com.example.demo.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class AdministradorServicio {

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CoberturaRepository coberturaRepository;

    public Marca registrarMarcas(String nombreMarca) {

        if(nombreMarca ==  null)
            throw new IllegalArgumentException("Por favor, envie datos validos");

        Optional<Marca> MarcaValidacion = marcaRepository.findByNombre(nombreMarca);

        if(MarcaValidacion.isPresent())
            throw new IllegalArgumentException("La marca ya existe con este nombre");

        Marca marcaToAdd = new Marca();
        marcaToAdd.setNombre(nombreMarca);

        return marcaRepository.save(marcaToAdd);
    }

    public Modelo registrarModelos(RegistrarModeloDto registrarModeloDto, MultipartFile imagen) {

        Optional<Marca> marcaValidacion = marcaRepository.findById(registrarModeloDto.getMarcaId());
        if(!marcaValidacion.isPresent())
            throw new IllegalArgumentException("La marca no existe, por favor revise los datos");

        Optional<Modelo> modeloValidacion = modeloRepository.findByNombreAndMarca(registrarModeloDto.getNombre(), marcaValidacion.get());
        if (modeloValidacion.isPresent()) {
            if (modeloValidacion.get().getFechaAnio().equals(registrarModeloDto.getAño()))
                throw new IllegalArgumentException("El modelo con ese nombre ya existe en esa marca");
        }


        if(imagen.isEmpty())
            throw new IllegalArgumentException("Debes incluir una imagen para agregar el modelo");

        Modelo modeloToAdd = new Modelo();

        modeloToAdd.setMarca(marcaValidacion.get());
        modeloToAdd.setFechaAnio(registrarModeloDto.getAño());
        modeloToAdd.setNombre(registrarModeloDto.getNombre());
        try {
            byte[] imagenBytes = imagen.getBytes();
            modeloToAdd.setImagen(imagenBytes);
        } catch (IOException e) {
            throw new IllegalArgumentException("Hubo un error al procesar la imagen", e);
        }

        return modeloRepository.save(modeloToAdd);
    }

    public Categoria registrarCategorias(RegistrarCategoriaDto registrarCategoriaDto) {

        if(registrarCategoriaDto.getNombre() ==  null || registrarCategoriaDto.getDescripcion() == null)
            throw new IllegalArgumentException("Por favor, envie datos validos");

        Optional<Categoria> categoriaValidacion = categoriaRepository.findByNombre(registrarCategoriaDto.getNombre());
        if(categoriaValidacion.isPresent())
            throw new IllegalArgumentException("La categoría ya existe con ese nombre");

        Categoria categoriaToAdd = new Categoria();

        categoriaToAdd.setNombre(registrarCategoriaDto.getNombre());
        categoriaToAdd.setDescripcion(registrarCategoriaDto.getDescripcion());

        return categoriaRepository.save(categoriaToAdd);
    }

    public Cobertura registrarCoberturas(RegistrarCoberturaDto registrarCoberturaDto) {

        Optional<Categoria> categoriaValidacion = categoriaRepository.findById(registrarCoberturaDto.getCategoriaID());
        if(!categoriaValidacion.isPresent())
            throw new IllegalArgumentException("La categoria no existe, por favor revise los datos");

        Optional<Cobertura> coberturaValidacion = coberturaRepository.findByDescripcionAndCategoria(registrarCoberturaDto.getDescripcion(), categoriaValidacion.get());
        if(coberturaValidacion.isPresent())
            throw new IllegalArgumentException("La cobertura con esa descripcion ya existe en esa categoria");

        Cobertura coberturaToAdd = new Cobertura();

        coberturaToAdd.setCategoria(categoriaValidacion.get());
        coberturaToAdd.setDescripcion(registrarCoberturaDto.getDescripcion());
        coberturaToAdd.setCostoMinimo(registrarCoberturaDto.getCostoMinio());
        coberturaToAdd.setCostoPorcentual(registrarCoberturaDto.getCostoPorcentual());

        return coberturaRepository.save(coberturaToAdd);
    }
}
