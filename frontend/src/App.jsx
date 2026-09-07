import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Feed from './pages/Feed';
import Perfil from './pages/Perfil';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/acessibilidade" element={<Placeholder title="Acessibilidade" message="As configurações de acessibilidade serão desenvolvidas na próxima etapa." />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
