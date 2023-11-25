import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import { Table, Button, Container, Form, Modal } from 'react-bootstrap';

const UserPage = () => {
  const { user} = useContext(UserContext);
  const [placa, setPlaca] = useState('');
  const [polizasFiltradas, setPolizasFiltradas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPoliza, setSelectedPoliza] = useState(null);
  const [mostrarTodasLasPolizas, setMostrarTodasLasPolizas] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredPolizas = user.listaPolizas.filter(poliza => poliza.numeroPlaca.includes(placa));
    setPolizasFiltradas(filteredPolizas);
    setMostrarTodasLasPolizas(false);
  };

  useEffect(() => {
    if (mostrarTodasLasPolizas) {
      setPolizasFiltradas(user.listaPolizas);
    }
  }, [user, mostrarTodasLasPolizas]);

  const handleVerDetalles = (poliza) => {
    setSelectedPoliza(poliza);
    setShowModal(true);
  };

  return (
    <Container fluid className="m-4">
      <h2 className="my-4">Busque su póliza por Placa</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Control type="text" name="buscarPlaca" style={{ width: '200px' }} className="mb-4" placeholder="Buscar por placa" onChange={e => setPlaca(e.target.value)} />
        <Button type="submit" id="buscarPlacaBtn">Buscar</Button>
      </Form>
      <h1 className="text-center m-4">Mis Pólizas</h1>
      <Table striped>
        <thead>
          <tr>
            <th style={{ width: '7%' }}>Id Póliza</th>
            <th style={{ width: '12%' }}>Número de placa</th>
            <th style={{ width: '15%' }}>Valor asegurado</th>
            <th style={{ width: '15%' }}>Fecha de vencimiento</th>
            <th style={{ width: '15%' }}>Modelo</th>
            <th style={{ width: '10%' }}>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {mostrarTodasLasPolizas ? (
            user.listaPolizas.map(poliza => (
              <tr key={poliza.idPoliza}>
                <td>{poliza.idPoliza}</td>
                <td>{poliza.numeroPlaca}</td>
                <td>{poliza.valorAsegurado}</td>
                <td>{poliza.fechaVencimiento.toString().substring(0, 10)}</td>
                <td>{poliza.modelo.nombre}-{poliza.modelo.fechaAnio}</td>
                <td>
                  <Button variant="primary" onClick={() => handleVerDetalles(poliza)}>Ver detalles</Button>
                </td>
              </tr>
            ))
          ) : (
            polizasFiltradas.length > 0 ? (
              polizasFiltradas.map(poliza => (
                <tr key={poliza.idPoliza}>
                  <td>{poliza.idPoliza}</td>
                  <td>{poliza.numeroPlaca}</td>
                  <td>{poliza.valorAsegurado}</td>
                  <td>{poliza.fechaVencimiento.toString().substring(0, 10)}</td>
                  <td>{poliza.modelo.nombre}-{poliza.modelo.fechaAnio}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleVerDetalles(poliza)}>Ver detalles</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay pólizas para mostrar</td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la póliza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPoliza && (
            <div>
              <p><strong>Id Póliza:</strong> {selectedPoliza.idPoliza}</p>
              <p><strong>Número de placa:</strong> {selectedPoliza.numeroPlaca}</p>
              <p><strong>Valor asegurado: ₡</strong> {selectedPoliza.valorAsegurado}</p>
              <p><strong>Fecha de creación:</strong> {selectedPoliza.fechaCreacion.toString().substring(0, 10)}</p>
              <p><strong>Fecha de vencimiento:</strong> {selectedPoliza.fechaVencimiento.toString().substring(0, 10)}</p>
              <p><strong>Modelo:</strong> {selectedPoliza.modelo.nombre} - {selectedPoliza.modelo.fechaAnio}</p>
              <p><strong>Costo: ₡</strong> {selectedPoliza.precioCalculado}</p>
              <p><strong>Plazo de pago:</strong> {selectedPoliza.plazo}</p>
              <p><strong>Cobertura:</strong> {selectedPoliza.cobertura.descripcion}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const AdminPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Panel de Administración</h1>

      <div className="mt-4">
        <p className="lead">Bienvenido al panel de administración del Sistema de Pólizas CR. Aquí podrás gestionar los siguientes aspectos del sistema:</p>
      </div>

      <div className="row mt-4">
        <div className="col-md-4 col-sm-12">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestión de clientes</h5>
              <p className="card-text">Te permite ver una lista de usuarios y una lista de polizas por usuario.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestión de marcas</h5>
              <p className="card-text">Permite ver las marcas con sus modelos y se pueden agregar marcas y modelos a las marcas.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gestión de categorías</h5>
              <p className="card-text">Se pueden agregar categorias y coberturas a las categorias.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { user } = useContext(UserContext);

  if (!user) return null; // Puedes mostrar un spinner o algo similar mientras carga el usuario

  return user.rol === 'Usuario' ? <UserPage /> : <AdminPage />;
};

export default HomePage;
