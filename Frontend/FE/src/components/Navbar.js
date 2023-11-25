import React, { useContext, useState } from 'react';  // Agrega useState aquí
import { UserContext } from '../services/UserContext';
import { Navbar, Nav, Dropdown, Container, Button } from 'react-bootstrap';  // Asegúrate de importar Button
import { useNavigate } from 'react-router-dom';
import Polizas from './Polizas';  // Si Polizas es el export default, no uses las llaves {}


const NavigationBar = () => {

  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);  // Ahora useState debería funcionar

  const handleLogout = () => {

    logout();
    navigate('/');
  };

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleUpdate = () => {
    navigate('/actualizar');
  };

  const handleInicio = () => {
    if (user) {
      navigate('/Inicio');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };



  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" onClick={handleInicio}>Sistema de Polizas CR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && user.rol === 'Usuario' && (
            <Nav className="me-auto">
              <Button variant="outline-light" onClick={handleOpenModal}>Comprar Poliza</Button>
              <Polizas show={show} handleClose={() => setShow(false)} />
            </Nav>
          )}
          {user && user.rol === 'Administrador' && (
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleNavigation('/clientes')}>Gestión clientes</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/marcas')}>Gestión marcas</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/categorias')}>Gestión categorias</Nav.Link>
            </Nav>
          )}
          {user && (
            <Dropdown as="div" className="position-static">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">{user.nombre}</Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item><img src="/images/icons/usuario.png" alt="inicio" width="75" /></Dropdown.Item>
                <Dropdown.Item>{user.correo}</Dropdown.Item>
                <Dropdown.Item>{user.telefono}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleUpdate}>Actualizar</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};



export default NavigationBar;