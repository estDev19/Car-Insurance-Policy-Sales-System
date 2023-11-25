import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../services/UserContext';
import { Container, Card, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [identificacion] = useState(user.identificacion);
    const [nombre, setNombre] = useState(user.nombre);
    const [telefono, setTelefono] = useState(user.telefono);
    const [correo, setCorreo] = useState(user.correo);
    const [nombreError, setNombreError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [correoError, setCorreoError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleNombreChange = (e) => {
        const nombre = e.target.value;
        setNombre(nombre);

        setNombreError(/^[a-zA-Z\s]*$/.test(nombre) ? '' : 'Por favor, no incluya números en el nombre');
    };

    const handleTelefonoChange = (e) => {
        const telefono = e.target.value;
        setTelefono(telefono);

        setTelefonoError(/^\d+$/.test(telefono) ? '' : 'Por favor, solo ingrese números en el teléfono');
    };

    const handleCorreoChange = (e) => {
        const correo = e.target.value;
        setCorreo(correo);

        setCorreoError(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo) ? '' : 'Por favor, ingrese un correo válido');
    };

    useEffect(() => {
        setIsFormValid(nombre !== '' && nombreError === '' && telefono !== '' && telefonoError === '' && correo !== '' && correoError === '');
    }, [nombre, nombreError, telefono, telefonoError, correo, correoError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/api/usuarios/actualizar', {
                identificacion: identificacion,
                nombre: nombre,
                telefono: telefono,
                email: correo
            });

            const { data, status } = response;
            if (status === 200 && data) {
                // Actualizar el usuario en el contexto con los nuevos datos
                setUser(data);

                // Mostrar el modal de actualización exitosa
                setShowModal(true);
            } else {
                // Si el status no es 200 o no hay datos, lanzamos un error
                throw new Error('Por favor revise los datos y vuelva a intentarlo.');
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            // Mostrar el error al usuario
            alert(error.message);
        }
    };


    const handleCloseModal = () => {
        // Cerrar el modal y redirigir al route de inicio
        setShowModal(false);
        navigate('/inicio');
    };

    return (
        <Container className="mx-auto" style={{ width: '75%' }}>
            <Row className="justify-content-center mt-5">
                <Col lg={5}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="text-center">
                                    <Form.Label>Identificacion</Form.Label>
                                    <Form.Control type="text" name="txtidentificacion" value={identificacion} disabled />
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="txtnombre" value={nombre} onChange={handleNombreChange} isInvalid={nombreError} />
                                    <Form.Control.Feedback type="invalid">{nombreError}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text" name="txttelefono" value={telefono} onChange={handleTelefonoChange} isInvalid={telefonoError} />
                                    <Form.Control.Feedback type="invalid">{telefonoError}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="text" name="txtcorreo" value={correo} onChange={handleCorreoChange} isInvalid={correoError} />
                                    <Form.Control.Feedback type="invalid">{correoError}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="text-center mt-4">
                                    <Button variant="success" type="submit" name="accion" value="Actualizar" disabled={!isFormValid}>
                                        Actualizar
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualización exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Los datos del usuario se han actualizado correctamente.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UpdateUser;
