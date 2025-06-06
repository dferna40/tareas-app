import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bmwImage from '../assets/bmw.png';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    puestoId: '',
    aceptarTerminos: false,
  });

  const [puestos, setPuestos] = useState([]);
  const navigate = useNavigate();

  // Cargar puestos desde la API
  useEffect(() => {
    fetch('http://localhost:8082/puestos')
      .then(res => res.json())
      .then(data => setPuestos(data))
      .catch(err => console.error('Error al cargar puestos:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.aceptarTerminos) {
      alert('Debes aceptar los términos y condiciones para registrarte.');
      return;
    }

    if (form.password !== form.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!form.puestoId) {
      alert('Debes seleccionar un puesto.');
      return;
    }

    try {
      // Paso 1: Registro técnico en auth-service
      const registroResponse = await fetch('http://localhost:8083/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password
        }),
      });

      if (!registroResponse.ok) {
        const errorText = await registroResponse.text();
        throw new Error(`Error en auth-service: ${errorText}`);
      }

      const registroData = await registroResponse.json();
      const token = registroData.token;

      localStorage.setItem('token', token);
      localStorage.setItem('nombre', registroData.nombre);
      localStorage.setItem('email', registroData.email);
      localStorage.setItem('role', registroData.role);

      // Paso 2: Crear perfil de usuario en api-tareas
      const perfilPayload = {
        nombre: form.nombre,
        email: form.email,
        puestoId: Number(form.puestoId)
      };

      console.log("➡ Enviando a api-tareas:", perfilPayload);

      const perfilResponse = await fetch('http://localhost:8082/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(perfilPayload),
      });

      if (!perfilResponse.ok) {
        const errorText = await perfilResponse.text();
        throw new Error(`Error en api-tareas: ${errorText}`);
      }

      const perfilData = await perfilResponse.json();
      console.log('Perfil creado correctamente:', perfilData);

      alert('¡Registro completo!');
      navigate('/');

    } catch (err) {
      console.error('Error durante el registro:', err.message);
      alert('Error durante el registro: ' + err.message);
    }
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
              <label className="form-label">Puesto *</label>
              <select
                className="form-control"
                name="puestoId"
                value={form.puestoId}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona un puesto --</option>
                {puestos.map((puesto) => (
                  <option key={puesto.id} value={puesto.id}>
                    {puesto.nombre}
                  </option>
                ))}
              </select>
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
