import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bmwImage from '../assets/bmw.png';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    aceptarTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.aceptarTerminos) {
      alert('Debes aceptar los términos y condiciones para registrarte.');
      return;
    }

    console.log('Formulario de registro enviado:', form);
  };

  return (
    <div className="login-container d-flex">
      <div
        className="login-image d-none d-md-block"
        style={{
          backgroundImage: `url(${bmwImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '50%',
          height: '100vh'
        }}
      ></div>

      <div className="login-form-container d-flex align-items-center justify-content-center w-100">
        <div className="login-form card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="text-center mb-4">
            <div className="rounded-circle bg-danger text-white d-inline-block p-3">
              <i className="bi bi-lock-fill fs-4"></i>
            </div>
            <h2 className="mt-2">Registro de Usuario</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña *</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmar contraseña *</label>
              <input
                type="password"
                className="form-control"
                name="confirmarPassword"
                value={form.confirmarPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="aceptarTerminos"
                checked={form.aceptarTerminos}
                onChange={handleChange}
                id="terminos"
                required
              />
              <label className="form-check-label" htmlFor="terminos">
                Acepto los <a href="/docs/terminos.pdf" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">REGISTRARME</button>
          </form>

          <div className="mt-3 text-center small">
            ¿Ya tienes cuenta? <Link to="/" className="text-primary">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
