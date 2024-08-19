# Backend do Chat em Tempo Real

Este repositório contém o backend para o sistema de chat em tempo real. O servidor gerencia autenticações, mantém o estado dos usuários e gerencia as mensagens entre os usuários em tempo real usando WebSockets.

**Deploy efetuado para testes de API na plataforma [RailWay](https://railway.app/).
## Visite para testar -> [RailWay - BackEnd - IXC](backend-ixc-production.up.railway.app) Para testar as funcionalidades.
OBS: Caso encontre algum problema, nos reporte.


## Tecnologias

Este projeto utiliza várias tecnologias chave para operar eficientemente:

- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript server-side.
- [Express](https://expressjs.com/): Framework web rápido, flexível e minimalista para Node.js.
- [Mongoose](https://mongoosejs.com/): Biblioteca de modelagem de objetos MongoDB para Node.js.
- [Socket.io](https://socket.io/): Biblioteca que permite comunicação em tempo real, bidirecional e baseada em eventos entre os navegadores e o servidor.
- [jsonwebtoken](https://jwt.io/): Implementação de JSON Web Tokens para segurança de autenticação.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Biblioteca para ajudar a hash passwords.
- [dotenv](https://www.npmjs.com/package/dotenv): Módulo para carregar variáveis de ambiente de um arquivo `.env` para `process.env`.
- [CORS](https://expressjs.com/en/resources/middleware/cors.html): Middleware para habilitar CORS (Cross-Origin Resource Sharing).

## Funcionalidades

- **Autenticação de Usuários:** Registro e login de usuários com segurança.
- **CRD de Usuários:** Criar, Ler e deletar usuários.
- **Gerenciamento de Mensagens:** Envio e recebimento de mensagens em tempo real.
- **Gerenciamento de Status de Usuários:** Atualiza o status dos usuários (online/offline).
- **Persistência de Dados:** Mensagens e dados do usuário são salvos no MongoDB.

## Como começar

Primeiramente, clone o repositório do projeto:

```bash
git clone https://github.com/devEzt/BackEnd-Ixc.git
```

Use o NPM para instalar todas as dependencias.

```bash
npm install
```

## Run para montar o Dist via Nodemon

```bash
npm run dev
```

## Run

```bash
npm start
```

## Banco de Dados

O teste me auxilio no aprimoramento de meu conhecimento técnico sobre Node e Api's no geral, buscando as libs atuais para conseguir o melhor resultado.

## Link repositório Front-end: 

```bash
 https://github.com/devEzt/frontend-ixc
```

Este README oferece uma visão geral clara do projeto, incluindo como configurar e executar o projeto localmente. As seções estão bem organizadas para facilitar a leitura e compreensão dos usuários que desejam usar ou contribuir para o projeto.
