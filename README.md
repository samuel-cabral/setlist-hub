# setlist-hub

Gerenciador de setlists para banda de igreja. Cadastre músicas (título, artista, tom e BPM) e, em seguida, monte setlists ordenadas para a data de cada culto. Projeto pessoal de estudo de Angular e MongoDB.

Estado atual: fatia vertical mínima (listar músicas e cadastrar uma música). Setlists ainda não foram implementadas.

## Stack

- `apps/web`: Angular (standalone components, signals, rotas, SCSS)
- `apps/api`: Node.js + Express + TypeScript, MongoDB com Mongoose, validação com zod
- Testes da API: vitest + supertest
- Monorepo com npm workspaces, CI no GitHub Actions

## Como rodar

Requer Node 22.22.3 ou superior (veja `.nvmrc`; o Angular CLI exige essa versão mínima) e Docker (opcional, para o MongoDB).

```bash
docker compose up -d                  # MongoDB em localhost:27017
npm install
cp apps/api/.env.example apps/api/.env
npm run dev -w apps/api               # API em http://localhost:3000
npm run start -w apps/web             # Web em http://localhost:4200
```

Sem Docker, suba um MongoDB por conta própria e ajuste `MONGODB_URI` em `apps/api/.env`.

## Scripts na raiz

- `npm run dev`: sobe a API em modo watch
- `npm run typecheck`: checagem de tipos dos dois apps
- `npm run build`: build dos dois apps
- `npm test`: testes da API (`/health` e validação do `POST /songs`, sem banco)

## API

- `GET /health`
- `GET /songs`
- `POST /songs` com `{ title, artist, key, bpm }`
