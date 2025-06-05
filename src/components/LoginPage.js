import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import bmwImage from '../assets/bmw.png';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 👈 Activamos navegación

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8083/auth/login', {
        email,
        password,
      });

      const { token, nombre, email: userEmail, role } = response.data;

      // Guardar datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('role', role);

      console.log('Login exitoso. Bienvenido/a,', nombre);

      // Redirigir a la página de tareas
      navigate('/tareas');

    } catch (error) {
      console.error('Error en el login:', error);
      alert('Credenciales incorrectas o error de conexión con el servidor.');
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
            <h2 className="mt-2">Acceder</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico *</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña *</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Recuérdame</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">ACCEDER</button>
          </form>

          <div className="d-flex justify-content-between mt-3">
            <a href="#" className="small">¿Olvidó su contraseña?</a>
            <a href="#" className="small">¿No tienes cuenta? Regístrate</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
