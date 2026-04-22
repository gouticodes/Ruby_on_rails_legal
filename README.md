# Legal Application (Rails Backend + Lightweight Frontend)

This repository contains:

- **Ruby on Rails backend** (REST-style endpoints and server-rendered legal management pages).
- **Lightweight dashboard frontend** built with **HTML + CSS + Vanilla JavaScript**.
- **Docker Compose setup** running backend, PostgreSQL, and a frontend Nginx container.

## Frontend Overview

The lightweight frontend is located in `frontend-lite/` and includes:

- `index.html`
- `styles.css`
- `script.js`
- `config.js`

### Features

- Single-page user dashboard
- App name shown in header
- User cards (name, email, role)
- Loading / error / empty states
- Search/filter input
- Refresh users button
- Responsive card grid with subtle hover + fade-in animation

## API Endpoint Used by Frontend

- `GET /users`

Rails exposes `/users` as JSON by mapping existing `Client` records to dashboard user objects.

## Docker Setup

### Services

- `web` (Rails API/backend) → `http://localhost:3000`
- `frontend` (Nginx static frontend + API reverse proxy) → `http://localhost:8080`
- `db` (PostgreSQL) → `localhost:5432`

### How frontend connects to backend

The frontend uses `API_BASE_URL=/api` from `frontend-lite/config.js`.

Nginx proxies:

- `/api/*` → `http://web:3000/*`

This uses the Docker service name `web` internally, so the frontend and backend communicate inside the Docker network without localhost coupling.

## Run

```bash
docker-compose up --build
```

Then open:

- Frontend dashboard: `http://localhost:8080`
- Rails backend (direct): `http://localhost:3000`

