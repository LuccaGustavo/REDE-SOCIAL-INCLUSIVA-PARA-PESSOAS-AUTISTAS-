import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialPosts = [
  {
    id: 1,
    author: 'Ana Clara',
    initials: 'AC',
    time: 'Hoje, 09:40',
    title: 'Rotina tranquila',
    body: 'Hoje organizei minha rotina visual e consegui fazer tudo com mais calma. Desejo uma manhã confortável para todos!',
    likes: 12,
    comments: ['Que bom saber disso, Ana!'],
    liked: false
  },
  {
    id: 2,
    author: 'Rafael Mendes',
    initials: 'RM',
    time: 'Ontem, 18:20',
    title: 'Dica de conforto',
    body: 'Para mim, fones com redução de ruído ajudam bastante em lugares movimentados. O que ajuda vocês?',
    likes: 8,
    comments: [],
    liked: false
  }
];

function getUserName() {
  return localStorage.getItem('userName') || 'Maria da Silva';
}

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [commenting, setCommenting] = useState(null);
  const [comment, setComment] = useState('');
  const userName = getUserName();

  function toggleLike(id) {
    setPosts((current) => current.map((post) => post.id === id
      ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
      : post));
  }

  function publishPost(event) {
    event.preventDefault();
    if (!newPost.trim()) return;
    setPosts((current) => [{
      id: Date.now(),
      author: userName,
      initials: userName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(),
      time: 'Agora',
      title: 'Nova publicação',
      body: newPost.trim(),
      likes: 0,
      comments: [],
      liked: false
    }, ...current]);
    setNewPost('');
  }

  function publishComment(id) {
    if (!comment.trim()) return;
    setPosts((current) => current.map((post) => post.id === id
      ? { ...post, comments: [...post.comments, comment.trim()] }
      : post));
    setComment('');
    setCommenting(null);
  }

  function logout() {
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return (
    <div className="social-page">
      <header className="topbar">
        <Link className="social-brand" to="/feed"><span className="brand-mark">+</span>Conecta+</Link>
        <nav className="topnav" aria-label="Navegação principal">
          <Link className="nav-link active" to="/feed">Início</Link>
          <Link className="nav-link" to="/perfil">Meu perfil</Link>
          <button className="logout-button" onClick={logout}>Sair</button>
        </nav>
      </header>

      <main className="social-layout">
        <aside className="welcome-panel">
          <p className="eyebrow">Espaço seguro</p>
          <h1>Olá, {userName.split(' ')[0]}.</h1>
          <p>Compartilhe experiências e encontre acolhimento no seu ritmo.</p>
          <div className="comfort-note"><span aria-hidden="true">☼</span><span>Seu conforto importa. Você pode ajustar suas preferências no perfil.</span></div>
          <Link className="secondary-button" to="/perfil">Ver meu perfil</Link>
        </aside>

        <section className="feed-column" aria-labelledby="feed-title">
          <div className="section-heading"><div><p className="eyebrow">Comunidade</p><h2 id="feed-title">Feed inicial</h2></div><span className="online-pill">● Comunidade ativa</span></div>

          <form className="composer-card" onSubmit={publishPost}>
            <div className="avatar small-avatar">{userName.slice(0, 2).toUpperCase()}</div>
            <div className="composer-content"><label htmlFor="new-post">O que você gostaria de compartilhar?</label><textarea id="new-post" rows="3" value={newPost} onChange={(event) => setNewPost(event.target.value)} placeholder="Escreva com tranquilidade..." /></div>
            <button className="primary-button compact-button" type="submit" disabled={!newPost.trim()}>Publicar</button>
          </form>

          <div className="posts-list">
            {posts.map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-header"><div className="avatar">{post.initials}</div><div><strong>{post.author}</strong><span>{post.time}</span></div><button className="more-button" aria-label="Mais opções">•••</button></div>
                <div className="post-body"><h3>{post.title}</h3><p>{post.body}</p></div>
                <div className="post-actions"><button className={`action-button ${post.liked ? 'liked' : ''}`} onClick={() => toggleLike(post.id)} aria-label={`Curtir publicação de ${post.author}`}>♡ <span>{post.likes} curtidas</span></button><button className="action-button" onClick={() => setCommenting(commenting === post.id ? null : post.id)}>▢ <span>{post.comments.length} comentários</span></button></div>
                {post.comments.length > 0 && <div className="comments-list">{post.comments.map((item, index) => <p key={`${post.id}-${index}`}><strong>Comentário:</strong> {item}</p>)}</div>}
                {commenting === post.id && <div className="comment-form"><input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Escreva um comentário" aria-label="Novo comentário" /><button className="secondary-button" onClick={() => publishComment(post.id)}>Enviar</button></div>}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export { getUserName };
