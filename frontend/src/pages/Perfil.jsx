import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserName } from './Feed';

export default function Perfil() {
  const navigate = useNavigate();
  const [name, setName] = useState(getUserName());
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preferences] = useState({
    'Modo escuro': 'Desativado',
    'Baixo estímulo visual': 'Ativado',
    'Animações': 'Desativadas',
    'Sons': 'Desativados',
    'Tamanho do texto': 'Padrão'
  });

  function saveName(event) {
    event.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem('userName', name.trim());
    setName(name.trim());
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function logout() {
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return (
    <div className="social-page">
      <header className="topbar"><Link className="social-brand" to="/feed"><span className="brand-mark">+</span>Conecta+</Link><nav className="topnav" aria-label="Navegação principal"><Link className="nav-link" to="/feed">Início</Link><Link className="nav-link active" to="/perfil">Meu perfil</Link><button className="logout-button" onClick={logout}>Sair</button></nav></header>
      <main className="profile-layout">
        <section className="profile-hero"><div className="avatar profile-avatar">{name.slice(0, 2).toUpperCase()}</div><div><p className="eyebrow">Minha conta</p><h1>{name}</h1><p>Este é o seu espaço pessoal no Conecta+.</p></div></section>
        {saved && <div className="status-message success" role="status">Perfil atualizado com sucesso.</div>}
        <div className="profile-grid">
          <section className="profile-card"><div className="card-heading"><div><p className="eyebrow">Informações pessoais</p><h2>Meu perfil</h2></div><button className="text-button" onClick={() => setEditing(!editing)}>{editing ? 'Cancelar' : 'Editar nome'}</button></div>{editing ? <form className="inline-form" onSubmit={saveName}><label htmlFor="profile-name">Nome de exibição</label><input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} /><button className="primary-button compact-button" type="submit">Salvar</button></form> : <div className="detail-row"><span>Nome de exibição</span><strong>{name}</strong></div>}<div className="detail-row"><span>Tipo de conta</span><strong>Membro da comunidade</strong></div></section>
          <section className="profile-card"><div className="card-heading"><div><p className="eyebrow">Conforto e acessibilidade</p><h2>Preferências</h2></div><Link className="text-button" to="/acessibilidade">Ajustar</Link></div><div className="preferences-list">{Object.entries(preferences).map(([label, value]) => <div className="preference-row" key={label}><span>{label}</span><span className={`preference-value ${value === 'Ativado' ? 'on' : ''}`}>{value}</span></div>)}</div></section>
        </div>
        <Link className="back-link" to="/feed">← Voltar para o feed</Link>
      </main>
    </div>
  );
}
