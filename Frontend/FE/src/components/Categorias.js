import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap';

const RegisterCategoriasCoberturas = () => {
    const [categoriaName, setCategoriaName] = useState("");
    const [categoriaDescription, setCategoriaDescription] = useState("");
    const [listaCategorias, setListaCategorias] = useState([]);
    const [isCategoriaFormValid, setIsCategoriaFormValid] = useState(false);
    const [coberturaDescription, setCoberturaDescription] = useState("");
    const [categoriaID, setCategoriaID] = useState("");
    const [coberturaCostoPorcentual, setCoberturaCostoPorcentual] = useState("");
    const [coberturaCostoMinimo, setCoberturaCostoMinimo] = useState("");
    const [isCoberturaFormValid, setIsCoberturaFormValid] = useState(false);
    const [error] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeKey, setActiveKey] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveKey(activeKey === index ? null : index);
    }

    const fetchCategorias = () => {
        axios.get('http://localhost:8080/api/usuarios/obtenerCategorias')
            .then(response => {
                setListaCategorias(response.data);
            }).catch(error => {
                console.errnor(error);
            });
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    useEffect(() => {
        setIsCategoriaFormValid(categoriaName.length > 0 && categoriaDescription.length > 0);
    }, [categoriaName, categoriaDescription]);

    useEffect(() => {
        const isCostoMinimoValid = coberturaCostoMinimo >= 1;
        const isCostoPorcentualValid = coberturaCostoPorcentual >= 1 && coberturaCostoPorcentual <= 100;
        const isFormValid = coberturaDescription.length > 0 && categoriaID.length > 0 && isCostoMinimoValid && isCostoPorcentualValid;
        setIsCoberturaFormValid(isFormValid);
      }, [coberturaDescription, categoriaID, coberturaCostoMinimo, coberturaCostoPorcentual]);

      const handleSubmitCategoria = (e) => {
        e.preventDefault();

        const formDataCategoria = new FormData();
        formDataCategoria.append('nombre', categoriaName);
        formDataCategoria.append('descripcion', categoriaDescription);
        
        axios.post('http://localhost:8080/api/administrador/registrarCategoria', formDataCategoria)
            .then(response => {
                setIsSuccess(true);
                setShowModal(true);
                fetchCategorias();
            }).catch(error => {
                setIsSuccess(false);
                setShowModal(true);
                console.error(error);
            });

        setCategoriaName("");
        setCategoriaDescription("");
    };

     
    const handleSubmitCobertura = (e) => {
        e.preventDefault();
      
        const formDataCobertura = new FormData();
        formDataCobertura.append('descripcion', coberturaDescription);
        formDataCobertura.append('categoriaID', parseInt(categoriaID));
        formDataCobertura.append('costoPorcentual', parseInt(coberturaCostoPorcentual));
        formDataCobertura.append('costoMinimo', parseInt(coberturaCostoMinimo));
      
        axios.post('http://localhost:8080/api/administrador/registrarCobertura', formDataCobertura)
          .then(response => {
            setIsSuccess(true);
            setShowModal(true);
            fetchCategorias();
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
                            <Card.Title>Agregar Categoría</Card.Title>
                            <Form onSubmit={handleSubmitCategoria}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nombreCategoria">Nombre de la categoría</Form.Label>
                                    <Form.Control
                                        type="text" id="nombreCategoria" name="nombreCategoria" value={categoriaName} onChange={e => setCategoriaName(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="descripcionCategoria">Descripción de la categoría</Form.Label>
                                    <Form.Control
                                        as="textarea" id="descripcionCategoria" name="descripcionCategoria" value={categoriaDescription} onChange={e => setCategoriaDescription(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" name="accion" value="AgregarCategoria" variant="primary" disabled={!isCategoriaFormValid}>Agregar Categoría</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Agregar Cobertura</Card.Title>
                            <Form onSubmit={handleSubmitCobertura} enctype="multipart/form-data">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="descripcionCobertura">Descripción de la cobertura</Form.Label>
                                    <Form.Control as="textarea" id="descripcionCobertura" name="descripcionCobertura" value={coberturaDescription} onChange={e => setCoberturaDescription(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="idCategoria">Categoria</Form.Label>
                                    <Form.Select id="idCategoria" name="idCategoria" value={categoriaID} onChange={e => setCategoriaID(e.target.value)} required>
                                        <option value="">Selecciona una categoría</option>
                                        {listaCategorias && listaCategorias.map((categoria, i) => (
                                            <option value={categoria.idCategoria} key={i}>{categoria.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="coberturaCostoMinimo">Costo mínimo (En colones = ₡)</Form.Label>
                                    <Form.Control type="number" min="1" id="coberturaCostoMinimo" name="coberturaCostoMinimo" value={coberturaCostoMinimo} onChange={e => setCoberturaCostoMinimo(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="coberturaCostoPorcentual">Costo porcentual</Form.Label>
                                    <Form.Control type="number" min="1" max="100" id="coberturaCostoPorcentual" name="coberturaCostoPorcentual" value={coberturaCostoPorcentual} onChange={e => setCoberturaCostoPorcentual(e.target.value)} required />
                                </Form.Group>
                                <Button type="submit" name="accion" value="AgregarCobertura" variant="primary" disabled={!isCoberturaFormValid}>Agregar Cobertura</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} sm={12}>
    <h2 className="my-4">Lista de Categorías y Coberturas</h2>
    <Accordion className="m-4" activeKey={activeKey} onSelect={handleAccordionClick}>
        {listaCategorias &&
            listaCategorias.map((categoria, i) => (
                <Accordion.Item key={i} eventKey={i.toString()}>
                    <Accordion.Header>{categoria.nombre}</Accordion.Header>
                    <Accordion.Body>
                        <p>{categoria.descripcion}</p>
                        <ListGroup variant="flush">
                            {categoria.listaCoberturas.map((cobertura, j) => (
                                <ListGroup.Item key={j}>
                                    <p>{cobertura.descripcion}</p>
                                    <p><strong>Costo mínimo:  ₡</strong> {cobertura.costoMinimo}</p>
                                    <p>Valor porcentual: {cobertura.costoPorcentual}</p>
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
                    <Modal.Title>Registro de Categoría/Cobertura</Modal.Title>
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

export default RegisterCategoriasCoberturas;
