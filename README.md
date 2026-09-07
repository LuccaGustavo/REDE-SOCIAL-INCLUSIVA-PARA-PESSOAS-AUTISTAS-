# Projeto Integrador IV — Pessoa 1: Login + Cadastro

Este pacote contém a implementação de FRONTEND da etapa "Login + Cadastro" da prova de conceito da rede social inclusiva para pessoas autistas.

## Relação com a 1ª etapa

Na primeira etapa, o projeto definiu uma rede social inclusiva para pessoas autistas e uma jornada que começa por "Cadastro e Configuração inicial". A prova de conceito desta parte implementa a entrada do usuário no sistema por meio de cadastro e login.

## O que está incluído

- Tela de Login
- Tela de Cadastro
- Navegação entre Login e Cadastro
- Validação dos campos
- Mensagens de erro/sucesso
- Interface simples, responsiva e com baixo estímulo visual
- Serviço de API preparado para integração com o backend
- Variáveis de ambiente para configurar a URL da API
- Dados de exemplo para teste visual, sem persistência real

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- Fetch API

> O backend e o banco de dados NÃO fazem parte deste pacote. A camada `src/services/api.js` já está preparada para a integração posterior.

## Como executar

Requisitos:
- Node.js instalado (versão LTS recomendada)
- npm

1. Abra um terminal na pasta `frontend`.
2. Execute:

```bash
npm install
npm run dev
```

3. Abra o endereço informado pelo Vite, normalmente:
`http://localhost:5173`

## Integração com o backend

Por padrão, o frontend usa:

`http://localhost:3000`

Quando o grupo criar o backend, basta criar/ajustar o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

### Contratos esperados

Cadastro:

`POST /usuarios`

Body:

```json
{
  "nome": "Maria da Silva",
  "email": "maria@email.com",
  "dataNascimento": "2002-05-10",
  "senha": "123456"
}
```

Login:

`POST /login`

Body:

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

O backend poderá retornar JSON. O frontend aceita uma resposta com `token`, `accessToken` ou apenas uma confirmação de sucesso.

---

# Projeto Integrador IV — Pessoa 2: Configurações de Acessibilidade

Esta parte do projeto implementa a etapa de configurações de acessibilidade da prova de conceito da rede social inclusiva para pessoas autistas.

## Relação com a 1ª etapa

Na primeira etapa, o projeto definiu uma rede social inclusiva para pessoas autistas, com uma jornada que inclui cadastro, configuração inicial, acesso ao feed e perfil.

Esta contribuição implementa a etapa de configuração de acessibilidade, permitindo que o usuário personalize a forma como utiliza a plataforma.

## O que foi desenvolvido

- Modo escuro;
- Baixo estímulo visual;
- Alteração do tamanho do texto;
- Ativação e desativação de animações;
- Ativação e desativação de sons;
- Salvamento das preferências no navegador;
- Botão para restaurar as configurações padrão;
- Interface responsiva;
- Navegação por teclado;
- Rota `/acessibilidade` conectada ao novo componente.

## Arquivos relacionados

- `frontend/src/components/AccessibilitySettings.jsx`
- `frontend/src/components/accessibility.css`
- `frontend/src/App.jsx`

A rota `/acessibilidade`, que anteriormente exibia uma tela provisória, agora abre a tela funcional de configurações de acessibilidade.

## Como testar

Na pasta `frontend`, execute:

```bash
npm install
npm run dev```

---

## Ponto de integração para a Pessoa 4

A Pessoa 4 pode manter as rotas acima ou alterar os caminhos no arquivo:

`src/services/api.js`

As funções já disponíveis são:

- `cadastrarUsuario(dados)`
- `loginUsuario(dados)`

Após o login, o frontend salva o token retornado em `localStorage` quando existir e direciona para `/feed`.

## Observação sobre senha

A senha é enviada ao backend somente para autenticação/cadastro. O frontend não deve armazená-la em `localStorage`. O hash seguro da senha deve ser responsabilidade do backend.

## Próximas etapas do grupo

- Conectar `POST /usuarios` ao banco de dados.
- Conectar `POST /login` ao banco.
- Definir autenticação/token.
- Criar Feed.
- Criar Configuração de acessibilidade.
- Criar Perfil.
- Integrar tudo em um único projeto.
