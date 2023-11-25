import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import { UserContext } from '../services/UserContext';
import axios from 'axios';

const Clientes = () => {
    const { user } = useContext(UserContext);
    const [clientes, setClientes] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [currentCliente, setCurrentCliente] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            if (user) {
                const res = await axios.get('http://localhost:8080/api/usuarios', {
                    headers: {
                        // Si el servidor requiere autenticación, puede enviar el token en los encabezados.
                        // 'Authorization': `Bearer ${user.token}`
                    }
                });
                setClientes(res.data);
            }
        };
        fetchClientes();
    }, [user]);

    const handleShowPolizas = (cliente) => {
        setCurrentCliente(cliente);
        setModalShow(true);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    }

    return (
        <div className="container-fluid m-4">
            <div className="col-md-8 col-sm-12">
                <h2 className="my-4">Lista de Clientes y Pólizas</h2>
                {clientes.map((cliente, i) => (
                    <Card className="m-4" key={i}>
                        <Card.Header as="h5">{cliente.nombre}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Identificación:</strong> {cliente.identificacion}<br />
                                <strong>Teléfono:</strong> {cliente.telefono}<br />
                                <strong>Correo:</strong> {cliente.correo}<br />
                                <strong>Tarjeta:</strong> {cliente.medio ? `Tarjeta finaliza en ${cliente.medio.numeroTarjeta.slice(-4)}` : 'No disponible'}
                            </Card.Text>
                            {cliente.listaPolizas && cliente.listaPolizas.length > 0 ? (
                                <Button onClick={() => handleShowPolizas(cliente)}>Ver pólizas</Button>
                            ) : (
                                <p>No tiene pólizas.</p>
                            )}
                        </Card.Body>
                    </Card>
                ))}

                <Modal show={modalShow} onHide={() => setModalShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Pólizas de {currentCliente ? currentCliente.nombre : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {currentCliente && currentCliente.listaPolizas ? (
                            currentCliente.listaPolizas.map((poliza, i) => (
                                <Card key={i} className="mb-3">
                                    <Card.Body>
                                        <Card.Title className="text-primary">Poliza #{poliza.idPoliza}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>
                                            <strong>Numero de placa:</strong> {poliza.numeroPlaca}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Valor Vehiculo Asegurado:</strong> ₡{poliza.valorAsegurado}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Plazo:</strong> {poliza.plazo}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Fecha creación:</strong> {formatDate(poliza.fechaCreacion)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Fecha vencimiento:</strong> {formatDate(poliza.fechaVencimiento)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Modelo:</strong> {poliza.modelo.nombre}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Cobertura:</strong> {poliza.cobertura.descripcion}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Costo: </strong> ₡{poliza.precioCalculado}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            ))
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Clientes;
