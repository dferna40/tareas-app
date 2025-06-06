import React, { useState } from 'react';
import axios from 'axios';

function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_AUTH_URL}/auth/recuperar-password`, {
        email: email
      });

      setMensaje('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');
      setEmail('');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMensaje('Hubo un error al intentar enviar el correo. Inténtalo más tarde.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar enlace</button>
      </form>

      {mensaje && (
        <div className="alert alert-info mt-4" role="alert">
          {mensaje}
        </div>
      )}
    </div>
  );
}

export default RecuperarPassword;
