import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RestablecerPassword() {
  const [token, setToken] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setMensaje('Token no válido. Vuelve a solicitar el enlace.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaPassword !== confirmarPassword) {
      setMensaje('❌ Las contraseñas no coinciden.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_AUTH_URL}/auth/restablecer-password`, {
        token,
        nuevaPassword
      });

      setMensaje('✅ Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
      setNuevaPassword('');
      setConfirmarPassword('');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al restablecer la contraseña. El token puede haber expirado o ser inválido.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nueva contraseña</label>
          <input
            type="password"
            className="form-control"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            className="form-control"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Restablecer contraseña
        </button>
      </form>

      {mensaje && (
        <div className="alert alert-info mt-4" role="alert">
          {mensaje}
        </div>
      )}
    </div>
  );
}

export default RestablecerPassword;
