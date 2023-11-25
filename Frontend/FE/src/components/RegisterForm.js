import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, FormGroup, FormControl, FormLabel, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [identificacion, setIdentificacion] = useState('');
  const [nombreCompleto, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setCorreo] = useState('');
  const [password, setContrasena] = useState('');
  const [tarjetaNom, setNombretarjeta] = useState('');
  const [tarjetaNum, setTarjetanum] = useState('');
  const [tarjetaanio, setAnio] = useState(currentYear);
  const [tarjetaMes, setMes] = useState(currentMonth);
  const [ccv, setCcv] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [tarjetaError, setTarjetaError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setCorreo(email);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(emailRegex.test(email) ? '' : 'Por favor, ingrese un correo válido');
  };

  const handleTarjetaChange = (e) => {
    const tarjeta = e.target.value.replace(/\D/, '');
    setTarjetanum(tarjeta);

    setTarjetaError(tarjeta.length === 16 ? '' : 'Por favor, ingrese un número de tarjeta válido de 16 dígitos');
  };

  useEffect(() => {
    if (tarjetaanio === currentYear) {
      setMes(currentMonth);
    }
  }, [tarjetaanio, currentYear, tarjetaMes, currentMonth]);

  useEffect(() => {
    setIsFormValid(
      identificacion !== '' &&
      nombreCompleto !== '' &&
      telefono !== '' &&
      email !== '' && emailError === '' &&
      password !== '' &&
      tarjetaNom !== '' &&
      tarjetaNum !== '' && tarjetaError === '' &&
      tarjetaanio !== '' &&
      tarjetaMes !== '' &&
      ccv !== ''
    );
  }, [identificacion, nombreCompleto, telefono, email, emailError, password, tarjetaNom, tarjetaNum, tarjetaError, tarjetaanio, tarjetaMes, ccv]);

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setAnio(selectedYear);

    if (selectedYear === currentYear) {
      setMes(currentMonth);
      document.getElementById("txtmes").min = currentMonth;
    } else {
      setMes(1);
      document.getElementById("txtmes").min = 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setShowModal(true);
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/register', {
        identificacion,
        nombreCompleto,
        telefono,
        email,
        password,
        tarjetaNom,
        tarjetaNum,
        tarjetaanio,
        tarjetaMes,
        ccv
      });

      const { data } = response;
      if (data) {
        setError('Usuario registrado correctamente');
        setShowModal(true);
        setRegisterSuccess(true);
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      if (error.response && error.response.status === 409) {
        setError('El usuario ya existe');
        setShowModal(true);
      } else {
        setError('Error al registrarse. Por favor, inténtalo de nuevo.');
        setShowModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (registerSuccess) {
      window.location.href = '/';
    }
  };

  return (
    <Container className="mt-4 mb-4 col-lg-8 d-flex flex-column">
      <Card className="col-sm-10">
        <Card.Body>
          <Form className="form-sign needs-validation" onSubmit={handleSubmit}>
            <div className="form-group text-center mb-1">
              <FormLabel>Bienvenido al Sistema de Pólizas</FormLabel>
              <br />
              <h3>Registrarse</h3>
              <img src="/images/inicio.png" alt="inicio" width="250" />
              <div>
                <FormLabel className="mt-4">
                  Ingrese sus datos y una vez registrado será redirigido a la página de ingreso
                </FormLabel>
                <br />
              </div>
            </div>
            <FormGroup className="form-group">
              <FormLabel>Identificación</FormLabel>
              <FormControl
                type="text"
                name="txtidentificacion"
                className="form-control"
                required
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value.replace(/\D/, ''))}
              />
            </FormGroup>
            <FormGroup className="form-group">
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl
                type="text"
                name="txtnombre"
                className="form-control"
                required
                value={nombreCompleto}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>

            <Row className="row mt-3">
              <Col className="col">
                <FormLabel>Teléfono</FormLabel>
                <FormControl
                  type="text"
                  name="txttelefono"
                  className="form-control"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value.replace(/\D/, ''))}
                />
              </Col>
              <Col className="col">
                <FormLabel>Correo</FormLabel>
                <FormControl
                  type="email"
                  name="txtcorreo"
                  className="form-control"
                  placeholder="Ingrese un correo válido"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
              </Col>
            </Row>
            <FormGroup className="form-group mt-3">
              <FormLabel>Contraseña</FormLabel>
              <FormControl
                type="password"
                name="txtpass"
                className="form-control"
                required
                value={password}
                onChange={(e) => setContrasena(e.target.value)}
              />
              {password.length < 8 && password.length !==0 && <div style={{ color: 'red' }}>La contraseña debe tener al menos 8 caracteres</div>}
            </FormGroup>
            <FormGroup className="form-group mt-3">
              <FormLabel>Nombre Completo Tarjeta</FormLabel>
              <FormControl
                type="text"
                name="txtnombretarjeta"
                className="form-control"
                required
                value={tarjetaNom}
                onChange={(e) => setNombretarjeta(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="form-group mt-3">
              <FormLabel>Número Tarjeta</FormLabel>
              <FormControl
                type="text"
                name="txttarjetanum"
                className="form-control"
                pattern="[0-9]{16}"
                title="Por favor, ingrese un número de tarjeta válido de 16 dígitos"
                placeholder="Ingrese los 16 dígitos de su tarjeta"
                required
                value={tarjetaNum}
                onChange={handleTarjetaChange}
              />
              {tarjetaError && tarjetaNum !==0 && <div style={{ color: 'red' }}>{tarjetaError}</div>}
            </FormGroup>

            <Row className="row mt-3">
              <Col className="col">
                <FormLabel>Año vencimiento</FormLabel>
                <FormControl
                  type="number"
                  id="txtanio"
                  name="txtanio"
                  className="form-control"
                  min={currentYear}
                  max={currentYear + 99}
                  required
                  value={tarjetaanio}
                  onChange={handleYearChange}
                />
              </Col>
              <Col className="col">
                <FormLabel>Mes vencimiento</FormLabel>
                <FormControl
                  type="number"
                  id="txtmes"
                  name="txtmes"
                  className="form-control"
                  min="1"
                  max="12"
                  required
                  value={tarjetaMes}
                  onChange={(e) => setMes(e.target.value)}
                />
              </Col>
              <Col className="col">
                <FormLabel>CCV</FormLabel>
                <FormControl
                  type="password"
                  FormControlmode="numeric"
                  pattern="[0-9]{3}"
                  name="txtccv"
                  className="form-control"
                  required
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value.replace(/\D/, ''))}
                />
              </Col>
            </Row>
            <FormGroup className="form-group text-center align-middle mt-5">
              <Button type="submit" className="btn btn-primary btn-success m-2" disabled={!isFormValid}>
                Registrar
              </Button>
              <Link to="/">
                <Button
                  type="button"
                  name="accion"
                  value="Registrar"
                  className="btn btn-primary btn btn-block ml-2"
                >
                  Regresar
                </Button>
              </Link>
            </FormGroup>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{registerSuccess ? 'Éxito' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegisterForm;
