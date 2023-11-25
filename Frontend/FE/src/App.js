import React from 'react';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';
import FooterBar from './components/FooterBar.js';
import NavigationBar from './components/Navbar.js';
import HomePage from './components/HomePage.js';
import UpdateUser from './components/UpdateUser.js';
import Marcas from './components/Marcas.js';
import Categorias from './components/Categorias.js';
import Polizas from './components/Polizas.js';
import Clientes from './components/Clientes.js';

import { UserProvider } from './services/UserContext.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {

  return (
    <UserProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar />
          <Container className="flex-grow-1">
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/inicio" element={<HomePage />} />
              <Route path="/registro" element={<RegisterForm />} />
              <Route path="/actualizar" element={<UpdateUser />} />
              <Route path="/marcas" element={<Marcas />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/polizas" element={<Polizas />} />
              <Route path="/clientes" element={<Clientes />} />
            </Routes>
          </Container>
          <FooterBar />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
