import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TareasPage from './components/TareasPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tareas" element={<TareasPage />} />
      </Routes>
    </Router>
  );
}

export default App;