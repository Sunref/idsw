# Locadora de Mídias — Projeto Ruby on Rails (IDSW)
<p align="center">
  <img alt="Ruby" src="https://img.shields.io/badge/Ruby-3.3.x-red?logo=ruby&style=flat" />
  <img alt="Rails" src="https://img.shields.io/badge/Rails-8.1-red?logo=rubyonrails&style=flat" />
  <img alt="React" src="https://img.shields.io/badge/React-18-blue?logo=react&style=flat" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-4.0-purple?logo=vite&style=flat" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?logo=tailwindcss&style=flat" />
  <img alt="MariaDB" src="https://img.shields.io/badge/MariaDB-10.11-blue?logo=mariadb&style=flat" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-compose-2496ED?logo=docker&style=flat" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat" />
</p>


Aplicação full‑stack para gerenciar aluguel de mídias (filmes).  
Backend: Ruby on Rails | Frontend: React (Vite + Tailwind) | Banco: MariaDB (Docker)

Autores: Fernanda M. (Sunref), Gabriel M. (gm64x), Kevin D. (kdz-22)

---

## Visão rápida
- Backend: API em Ruby on Rails (Ruby 3.3.x, Rails 8.1)
- Frontend: React + Vite, estilos com Tailwind CSS
- Banco: MariaDB (container via Docker Compose)
- Seeds / esquema: `Ruby/database/locacao_midias.sql`

Este README traz instruções concisas para rodar o projeto localmente. Se quiser, eu posso documentar os endpoints da API ou gerar um `docker-compose.yml` unificado para backend + db + frontend.

---

## Estrutura relevante
- `Ruby/locadora` — aplicação Rails (backend)
- `Ruby/frontend` — aplicação React (frontend)
- `Ruby/database/locacao_midias.sql` — DDL + inserts (dados de exemplo)
- `Ruby/compose.yml` — Compose para o serviço MariaDB
- `Ruby/comandos.txt` — comandos úteis

---

## Pré-requisitos
- Docker & Docker Compose
- Ruby (recomendado via RVM) — v3.3.4
- Bundler (gems) — via `bundle install`
- Node.js & npm (frontend)

---

## Quick Start (3 passos)

1) Suba o banco (MariaDB)
```Ruby/compose.yml#L1-40
cd Ruby
docker-compose -f compose.yml up -d db
```
O container criará o banco `locacao_midias` e executará o script `Ruby/database/locacao_midias.sql` com dados de exemplo.

2) Backend (Rails)
```Ruby/comandos.txt#L1-6
cd Ruby/locadora
# opcional: rvm install "ruby-3.3.4"
gem install bundler
bundle install
./bin/rails db:prepare
./bin/rails server -b 0.0.0.0 -p 3000
```
A API ficará disponível em `http://localhost:3000`.

3) Frontend (Vite + React)
```Ruby/frontend/package.json#L1-40
cd Ruby/frontend
npm install
npm run dev
```
O frontend costuma rodar em `http://localhost:5173`. Ajuste a URL da API no frontend se necessário.

---

## Credenciais padrão (compose)
Ver `Ruby/compose.yml`. Valores padrão usados:
- usuário: `admin`
- senha: `123`
- database: `locacao_midias`
- root password: `admin123`

Atualize `Ruby/locadora/config/database.yml` (ou variáveis de ambiente) se precisar alterar conexão.

---

## Banco de dados
O arquivo `Ruby/database/locacao_midias.sql` contém:
- DDL para tabelas (estado, cidade, cliente, ator, genero, classificacao_etaria, tipo, classificacao_interna, midia, locacao, exemplar, item_locacao)
- Inserts com conjuntos de teste (clientes, atores, mídias, exemplares etc.)

Use-o como referência do modelo de domínio ou para repopular dados.

---

## Dicas rápidas
- Windows: prefira WSL para executar Ruby/Rails sem problemas com gems nativas.
- CORS: a gem `rack-cors` já está no `Gemfile`; valide sua configuração caso frontend/backend estejam em origens diferentes.
- Conexão DB: use `host: db` quando Rails estiver em container; em ambiente local, verifique `config/database.yml`.
- Recriar DB com seed:
```Ruby/compose.yml#L1-40
cd Ruby
docker-compose -f compose.yml down -v
docker-compose -f compose.yml up -d db
```

---

## Próximos passos (sugestões)
- Documentar rotas/endereços da API (`rails routes`)
- Criar `docker-compose.yml` que suba backend + db + frontend
- Adicionar scripts de setup (`scripts/setup.sh`) e um `.env.example`
- Gerar README em inglês

---

## Contribuições
Fork → branch → PR. Inclua descrição das mudanças e passos para validar.

---

## Créditos
Projeto para a disciplina IDSW — Prof. David Buzatto.  
Autores: Fernanda M., Gabriel M., Kevin D.
