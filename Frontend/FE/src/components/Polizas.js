import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../services/UserContext';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col, Accordion, ListGroup, Modal } from 'react-bootstrap';
const CompraPolizaModal = ({ show, handleClose }) => { // Recibe show y handleClose como props
    const [step, setStep] = useState(1);
    const getToday = () => {
        const today = new Date();
        const oneYearFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return oneYearFromToday.toISOString().substr(0, 10);
    };
    const getOneYearFromToday = () => {
        const today = new Date();
        const oneYearFromToday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
        return oneYearFromToday.toISOString().substr(0, 10);
    };
    const { user, setUser, updateUserPolizas } = useContext(UserContext);
    const [listaPolizas, setListaPolizas] = useState([]);
    const [identificacion] = useState(user.identificacion);
    const [numeroPlaca, setNumeroPlaca] = useState("");
    const [marcaID, setMarcaID] = useState("");
    const [modeloID, setModeloID] = useState("");
    const [coberturaID, setCoberturaID] = useState("");
    const [categoriaID, setCategoriaID] = useState("");
    const [plazo, setPlazo] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState(getToday());
    const [fechaVencimiento, setFechaVencimiento] = useState(getOneYearFromToday());
    const [valorAsegurado, setValorAsegurado] = useState("");
    const [listaModelos, setListaModelos] = useState([]);
    const [listaMarcas, setListaMarcas] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const handleNextStep = () => setStep(step + 1);
    const handlePreviousStep = () => setStep(step - 1);
    const [precioFinal, setPrecioFinal] = useState(0);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    // Efecto para desactivar el button si los datos no estan completos
    useEffect(() => {
        const isDataComplete = numeroPlaca !== "" && plazo !== "" &&
            fechaCreacion !== "" && fechaVencimiento !== "" && valorAsegurado !== "" && coberturaID !== "";
        setDisableSubmit(!isDataComplete);
    }, [identificacion, numeroPlaca, plazo, fechaCreacion, fechaVencimiento, valorAsegurado, coberturaID]);
    // Efecto para actualizar precioFinal cada vez que cambia valorAsegurado o coberturaID.
    useEffect(() => {
        if (coberturaID !== "" && valorAsegurado !== "") {
            // Encuentra la cobertura seleccionada
            let coberturaSeleccionada;
            listaCategorias.some(categoria =>
                coberturaSeleccionada = categoria.listaCoberturas.find(cobertura => cobertura.idCobertura === parseInt(coberturaID))
            );
            if (coberturaSeleccionada) {
                const precioPorcentual = valorAsegurado * (coberturaSeleccionada.costoPorcentual / 100);
                setPrecioFinal(precioPorcentual > coberturaSeleccionada.costoMinimo ? precioPorcentual : coberturaSeleccionada.costoMinimo);
            }
        }
    }, [valorAsegurado, coberturaID]);
    const handleReset = () => {
        handleClose(); // Función para cerrar el modal
        setPlazo("");
        setModeloID("");
        setCoberturaID("");
        setCategoriaID("");
        setNumeroPlaca("");
        setValorAsegurado("");
        setStep(1);
    };
    const fetchModelos = () => {
        axios.get('http://localhost:8080/api/usuarios/obtenerModelos')
            .then(response => {
                setListaModelos(response.data);
            }).catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        fetchModelos();
    }, []);
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
    const fetchCategorias = () => {
        axios.get('http://localhost:8080/api/usuarios/obtenerCategorias')
            .then(response => {
                setListaCategorias(response.data);
            }).catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        fetchCategorias();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                numeroPlaca: numeroPlaca,
                valorAsegurado: parseFloat(valorAsegurado),
                plazo: plazo,
                fechaCreacion: fechaCreacion,
                fechaVencimiento: fechaVencimiento,
                idUsuario: identificacion,
                idModelo: parseInt(modeloID),
                idCobertura: parseInt(coberturaID)
            };

            const responseCompra = await axios.post('http://localhost:8080/api/usuarios/comprarPoliza', data);
            if (responseCompra.status === 200) {
                handleReset();
                const response = await axios.get('http://localhost:8080/api/usuarios/obtenerPolizasUsuario', {
                    params: { identificacion: user.identificacion },
                });

                if (response.status === 200) {
                    updateUserPolizas(response.data);
                    setShowSuccessModal(true); // Mostrar el modal de éxito
                } else {
                    setShowErrorModal(true); // Mostrar el modal de error
                }
            } else {
                handleReset();
                setShowErrorModal(true); // Mostrar el modal de error
            }
        } catch (error) {
            handleReset();
            console.error('Error al enviar los datos de la póliza:', error);
            setShowErrorModal(true); // Mostrar el modal de error
        }
    };

    // Agrega un nuevo estado
    const [nextDisabled, setNextDisabled] = useState(true);

    // Para el Paso 1, verifica que los campos modeloID y numeroPlaca no estén vacíos
    useEffect(() => {
        if (step === 1) {
            setNextDisabled(!modeloID || !numeroPlaca);
        }
    }, [modeloID, numeroPlaca, step]);

    // Para el Paso 2, verifica que los campos plazo, fechaCreacion, fechaVencimiento y valorAsegurado no estén vacíos
    useEffect(() => {
        if (step === 2) {
            setNextDisabled(!plazo || !fechaCreacion || !fechaVencimiento || !valorAsegurado);
        }
    }, [plazo, fechaCreacion, fechaVencimiento, valorAsegurado, step]);



    return (
        <><Modal show={show} onHide={handleReset} backdrop="static"> {/* Usa las props show y handleCancel aquí */}
            <Modal.Header closeButton>
                <Modal.Title>
                    {step === 1 && 'Paso 1 - Seleccione el modelo y placa de su vehículo'}
                    {step === 2 && 'Paso 2 - Complete los siguientes datos'}
                    {step === 3 && 'Paso 3 - Confirme su compra'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="idModelo">Modelo</Form.Label>
                            <Form.Select id="idModelo" name="idModelo" value={modeloID} onChange={e => setModeloID(e.target.value)} required>
                                <option value="">Selecciona un modelo</option>
                                {listaMarcas && listaMarcas.map((marca, i) => (
                                    <optgroup label={marca.nombre} key={i}>
                                        {marca.listaModelos.map((modelo, j) => (
                                            <option value={modelo.idModelo} key={j}>{modelo.nombre} año: {modelo.fechaAnio}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formNumeroPlaca">
                            <Form.Label>Número de placa</Form.Label>
                            <Form.Control
                                type="text"
                                name="numeroPlaca"
                                value={numeroPlaca}
                                onChange={e => setNumeroPlaca(e.target.value)} required />
                        </Form.Group>
                    </Form>
                )}
                {step === 2 && (
                    <Form>
                        <Form.Group controlId="formPlazo">
                            <Form.Label>Plazos de pago</Form.Label>
                            <Form.Select
                                name="plazo"
                                value={plazo}
                                onChange={e => setPlazo(e.target.value)} required
                            >
                                <option value="" disabled>
                                    Selecciona los plazos de pago
                                </option>
                                <option value="Anual">Anual</option>
                                <option value="Trimestral">Trimestral</option>
                                <option value="Semestral">Semestral</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFechaCreacion">
                            <Form.Label>Fecha de Creación</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechaCreacion"
                                value={fechaCreacion} required
                                readOnly />
                        </Form.Group>
                        <Form.Group controlId="formFechaVencimiento">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechaVencimiento"
                                value={fechaVencimiento} required
                                readOnly />
                        </Form.Group>
                        <Form.Group controlId="formValorAsegurado">
                            <Form.Label>Valor Asegurado (En colones = ₡)</Form.Label>
                            <Form.Control
                                type="text"
                                name="valorAsegurado"
                                onChange={e => setValorAsegurado(e.target.value)} required
                                value={valorAsegurado} />
                        </Form.Group>
                    </Form>
                )}
                {step === 3 && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="idCobertura">Categoría y coberturas</Form.Label>
                            <Form.Select id="idCobertura" name="idCobertura" value={coberturaID}
                                onChange={e => setCoberturaID(e.target.value)} required
                            >
                                <option value="">Selecciona una categoría y cobertura</option>
                                {listaCategorias && listaCategorias.map((categoria, i) => (
                                    <optgroup label={categoria.nombre} key={i}>
                                        {categoria.listaCoberturas.map((cobertura, j) => (
                                            <option value={cobertura.idCobertura} key={j}>
                                                {cobertura.descripcion}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Form.Select>
                            {coberturaID && (
                                <p className="mt-3"><strong>Costo:  </strong>₡{precioFinal}</p>
                            )}
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                {step > 1 && step < 4 && (
                    <Button variant="secondary" onClick={handlePreviousStep}>
                        Anterior
                    </Button>
                )}
                {step < 3 && (
                    // Finalmente, utiliza el estado para controlar la propiedad disabled del botón Siguiente.
                    <Button variant="primary" onClick={handleNextStep} disabled={nextDisabled}>
                        Siguiente
                    </Button>
                )}
                {step === 3 && (
                    <Button variant="primary" onClick={handleSubmit} disabled={disableSubmit}>
                        Comprar
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Compra exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tu compra se realizó con éxito.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal><Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Error en la compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ocurrió un error al realizar la compra. Por favor, inténtalo de nuevo más tarde.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CompraPolizaModal;