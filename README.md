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
- Criar Feed.
- Criar Configuração de acessibilidade.
- Criar Perfil.
- Integrar tudo em um único projeto.
