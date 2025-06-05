import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TareasPage from './components/TareasPage';
import Registro from './components/Registro';
import RecuperarPassword from './components/RecuperarPassword';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/tareas" element={<TareasPage />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
      </Routes>
    </Router>
  );
}

export default App;