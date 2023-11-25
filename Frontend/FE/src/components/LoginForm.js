import React, { useContext, useEffect} from 'react';
import { UserContext } from "../services/UserContext";
import FormLabel from 'react-bootstrap/FormLabel';
import { useState } from 'react';
import { Container, Card, Form, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login, user, error, logout } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtenga los valores de los campos de entrada
    const username = e.target.txtuser.value;
    const password = e.target.txtpass.value;

    // Inicie sesión en el usuario y maneje la respuesta
    login(username, password)
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch(() => {
        setShowModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    if (user) {
      history('/inicio');
    }
  };

  useEffect(() => {
    logout();
  }, []);


  
  

  return (
    <Container className="d-flex flex-column justify-content-center mt-5 mb-4">
      <Card style={{ width: '18rem' }} className="mx-auto shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="text-center">
              <h3>Inicio</h3>
              <FormLabel>Bienvenido al Sistema de Polizas</FormLabel><br />
              <img src="/images/inicio.png" alt="inicio" width="250" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Id de Usuario</FormLabel>
              <FormControl type="text" name="txtuser" placeholder="Ingrese su identificacion" required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Contraseña</FormLabel>
              <FormControl type="password" name="txtpass" placeholder="Ingrese su contraseña" required />
            </FormGroup>
            <FormGroup className="text-center">
              <Button type="submit" name="accion" value="Ingresar" className="btn-primary w-100 mt-2">Ingresar</Button>
              <Link to="/registro">
                <Button type="button" name="accion" value="Registrar" className="btn-success w-100 mt-2">Registrar</Button>
              </Link>
            </FormGroup>
            {error && <p className="text-danger text-center">{error}</p>}
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>¡Error al iniciar sesión! <br />
          Por favor revise sus datos</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>¡Has iniciado sesión correctamente!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseSuccessModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginForm;