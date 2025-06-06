import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import usuario from '../assets/usuario.png';

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const resumen = {
    pendientes: 5,
    completadas: 12,
    porHacer: 3
  };

  const tareasProximas = [
    { titulo: 'Preparar informe mensual', fecha: '2024-04-25' },
    { titulo: 'Revisar documentación', fecha: '2024-04-26' },
    { titulo: 'Enviar actualización de proyecto', fecha: '2024-04-27' }
  ];

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de guardado aquí
    handleClose();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Dashboard</h1>
        <img
  src={usuario}
  alt="Usuario"
  className="rounded-circle"
  style={{ width: 40, height: 40, cursor: 'pointer' }}
  onClick={() => navigate('/usuario')}
/>
      </div>

      <Button variant="primary" className="mb-4" onClick={handleShow}>
        ➕ Crear nueva tarea
      </Button>

      {/* Resumen de tareas */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Resumen de tareas del usuario actual</h5>
          <div className="d-flex justify-content-around mt-3">
            <div className="text-center">
              <h4>{resumen.pendientes}</h4>
              <p>Pendientes</p>
            </div>
            <div className="text-center">
              <h4>{resumen.completadas}</h4>
              <p>Completadas</p>
            </div>
            <div className="text-center">
              <h4>{resumen.porHacer}</h4>
              <p>Por hacer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tareas próximas */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Tareas próximas a vencer</h5>
          <ul className="list-group list-group-flush">
            {tareasProximas.map((tarea, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <span>{tarea.titulo}</span>
                <span>{new Date(tarea.fecha).toLocaleDateString('es-ES')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Bootstrap para nueva tarea */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nueva tarea</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Título de la tarea" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" placeholder="Descripción de la tarea" rows={3} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha límite</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
