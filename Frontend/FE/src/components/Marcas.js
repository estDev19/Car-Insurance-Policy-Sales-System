import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap';

const RegisterMarcasModelos = () => {
    const [marcaName, setMarcaName] = useState("");
    const [listaMarcas, setListaMarcas] = useState([]);
    const [isMarcaFormValid, setIsMarcaFormValid] = useState(false);
    const [modeloName, setModeloName] = useState("");
    const [marcaID, setMarcaID] = useState("");
    const [anio, setAnio] = useState("");
    const [imagen, setImagen] = useState(null);
    const [isModeloFormValid, setIsModeloFormValid] = useState(false);
    const [error] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeKey, setActiveKey] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveKey(activeKey === index ? null : index);
    }
    
    const fetchMarcas = () => {
        axios.get('http://localhost:8080/api/usuarios/obtenerMarcas')
            .then(response => {
                setListaMarcas(response.data);
            }).catch(error => {
                console.error(error);
            });
    };
    
    useEffect(() => {
        fetchMarcas();
    }, []);

    useEffect(() => {
        setIsMarcaFormValid(marcaName.length > 0);
    }, [marcaName]);

    useEffect(() => {
        setIsModeloFormValid(modeloName.length > 0 && marcaID.length > 0 && anio.length === 4 && imagen);
    }, [modeloName, marcaID, anio, imagen]);

    const handleSubmitMarca = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/administrador/registrarMarca', marcaName, {
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            setIsSuccess(true);
            setShowModal(true);
            fetchMarcas();
            setMarcaName("");
        }).catch(error => {
            setIsSuccess(false);
            setShowModal(true);
            console.error(error);
        });

        setMarcaName("");
    };

    const handleSubmitModelo = (e) => {
        e.preventDefault();
    
        if (imagen.size > 1048576) { //tamanio maximo de la imgn
            setShowModal(true);
            return;
        }
    
        const formData = new FormData();
        formData.append('nombre', modeloName);
        formData.append('marcaId', parseInt(marcaID));
        formData.append('año', parseInt(anio));
        formData.append('imagen', imagen);
    
        axios.post('http://localhost:8080/api/administrador/registrarModelo', formData)
            .then(response => {
                setIsSuccess(true);
                setShowModal(true);
                fetchMarcas();
                // Reinicia los campos después de un éxito
                setModeloName("");
                setMarcaID("");
                setAnio("");
                setImagen(null);
            }).catch(error => {
                setIsSuccess(false);
                setShowModal(true);
                console.error(error);
            });
    };
    

    return (
        <Container fluid className="m-4">
            <Row>
                <Col md={4} sm={12} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Agregar Marca</Card.Title>
                            <Form onSubmit={handleSubmitMarca}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nombreMarca">Nombre de la marca</Form.Label>
                                    <Form.Control
                                        type="text" id="nombreMarca" name="nombreMarca" value={marcaName} onChange={e => setMarcaName(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" name="accion" value="AgregarMarca" variant="primary" disabled={!isMarcaFormValid}>Agregar Marca</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Agregar Modelo</Card.Title>
                            <Form onSubmit={handleSubmitModelo} enctype="multipart/form-data">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nombreModelo">Nombre del modelo</Form.Label>
                                    <Form.Control type="text" id="nombreModelo" name="nombreModelo" value={modeloName} onChange={e => setModeloName(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="idMarca">Marca</Form.Label>
                                    <Form.Select id="idMarca" name="idMarca" value={marcaID} onChange={e => setMarcaID(e.target.value)} required>
                                        <option value="">Selecciona una marca</option>
                                        {listaMarcas && listaMarcas.map((marca, i) => (
                                            <option value={marca.idMarca} key={i}>{marca.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="fechaAnio">Año</Form.Label>
                                    <Form.Control type="number" id="fechaAnio" name="fechaAnio" pattern="[0-9]{4}" min="2000" value={anio} onChange={e => setAnio(e.target.value)} required />
                                </Form.Group>
                                <Form.Group controlId="modeloImagen" className="mb-3">
                                    <Form.Label>Imagen del modelo (Válido únicamente JPG)</Form.Label>
                                    <Form.Control type="file" accept="image/jpg" onChange={e => setImagen(e.target.files[0])} required />
                                </Form.Group>
                                <Button type="submit" name="accion" value="AgregarModelo" variant="primary" disabled={!isModeloFormValid}>Agregar Modelo</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} sm={12}>
                    <h2 className="my-4">Lista de Marcas y Modelos</h2>
                    <Accordion className="m-4" activeKey={activeKey} onSelect={handleAccordionClick}>
                        {listaMarcas && listaMarcas.map((marca, i) => (
                            <Accordion.Item key={i} eventKey={i.toString()}>
                                <Accordion.Header>
                                    {marca.nombre}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush">
                                        {marca.listaModelos.map((modelo, j) => (
                                            <ListGroup.Item key={j}>{modelo.nombre} ({modelo.fechaAnio})
                                                <img src={`data:image/jpg;base64,${modelo.imagen}`} alt={modelo.nombre} className="img-thumbnail" width="100" />
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro de Marca/Modelo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isSuccess ? "Se registró correctamente." : `Hubo un error al registrar. ${error}`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RegisterMarcasModelos;
