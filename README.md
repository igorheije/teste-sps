# Teste SPS - Workspace

Este workspace contém dois projetos:

- **Frontend**: React app (`test-sps-react`)
- **Backend**: Node.js/Express server (`test-sps-server`)

## Configuração Inicial

1. Instale as dependências de todos os projetos:

```bash
npm run install:all
```

## Como Rodar os Projetos

### Opção 1: Rodar ambos simultaneamente (Recomendado)

```bash
npm run dev
```

### Opção 2: Rodar individualmente

**Backend (servidor):**

```bash
npm run dev:server
```

**Frontend (cliente):**

```bash
npm run dev:client
```

## Portas Utilizadas

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## Documentação da API (Swagger)

A documentação completa da API está disponível através do Swagger UI:

**URL da Documentação**: http://localhost:3001/api-docs

## Scripts Disponíveis

- `npm run dev` - Roda ambos os projetos simultaneamente
- `npm run dev:server` - Roda apenas o servidor backend
- `npm run dev:client` - Roda apenas o cliente React
- `npm run install:all` - Instala dependências de todos os projetos
- `npm run build` - Faz build do projeto React

## Estrutura do Projeto

```
Teste SPS/
├── package.json          # Configuração do workspace
├── README.md            # Este arquivo
├── test-sps-react/      # Frontend React
└── test-sps-server/     # Backend Node.js/Express
```
