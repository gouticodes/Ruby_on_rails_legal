# Legal Case Management System

A Dockerized **Rails backend** plus a **multi-page Vanilla JS frontend** served by Nginx.

## Architecture

- **backend**: Ruby on Rails app (`http://localhost:3000`)
- **frontend**: Nginx serving static files (`http://localhost:8080`)
- **db**: PostgreSQL

Frontend calls backend using `/api/*`.
Nginx proxies `/api/*` to the Docker service name `backend`.

## Frontend Structure

```text
frontend/
  index.html
  users.html
  cases.html
  documents.html
  profile.html
  css/styles.css
  js/config.js
  js/api.js
  js/main.js
  js/users.js
  js/cases.js
  js/documents.js
  Dockerfile
  nginx.conf
```

## Frontend Pages

- **Dashboard (`index.html`)**
  - Summary cards: users, cases, documents
  - Recent activity list
- **Users (`users.html`)**
  - User table + card layout
  - Live search/filter
- **Cases (`cases.html`)**
  - Case table with search
  - Modal create/edit
  - Delete case action
- **Documents (`documents.html`)**
  - Document list from API
  - Simple local add form
- **Profile (`profile.html`)**
  - Static profile section

## Backend API Endpoints Used

- `GET /api/users`
- `GET /api/cases`
- `POST /api/cases`
- `PUT /api/cases/:id`
- `DELETE /api/cases/:id`
- `GET /api/documents`

## Run

```bash
docker compose up --build
```

Then open:

- Frontend UI: `http://localhost:8080`
- Backend API: `http://localhost:3000`

## Backend Compatibility Notes

- CORS is enabled for `/api/*`.
- Docker proxy target uses service name `backend`.
- Frontend API base URL is configurable in `frontend/js/config.js`.
