import AccessibilitySettings from './components/AccessibilitySettings';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/feed" element={<Placeholder title="Feed" message="O Feed será desenvolvido na próxima etapa do grupo." />} />
      <Route path="/acessibilidade" element={<AccessibilitySettings />} />
      <Route path="/perfil" element={<Placeholder title="Perfil" message="O Perfil será desenvolvido na próxima etapa." />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
