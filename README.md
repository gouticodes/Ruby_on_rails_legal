# Legal Application (Rails API + React Frontend)

This repository now contains:

- **Rails backend** for legal domain APIs.
- **Production-ready React + Vite frontend** in `frontend/`.

## Frontend Stack

- React 18 + Vite
- React Router 6
- Tailwind CSS 3
- Axios
- Framer Motion (basic animations)
- React Toastify (toast notifications)

## Frontend Folder Structure

```text
frontend/
  src/
    api/            # axios client + typed service modules
    app/            # app bootstrap shell
    components/     # reusable UI components
      common/       # button, card, loader, input, empty state
      layout/       # navbar/sidebar/app shell
      cases/        # case-specific UI
      documents/    # document upload UI
      audit/        # audit logs table
    context/        # auth + theme state
    hooks/          # reusable hooks (async state)
    pages/          # route pages
    router/         # route configuration + guards
    utils/          # storage and utility modules
```

## Environment Variables

Copy and edit:

```bash
cp frontend/.env.example frontend/.env
```

- `VITE_API_BASE_URL`: Rails API base URL (e.g. `http://localhost:3000/api/v1`)
- `VITE_APP_NAME`: Optional app name

## Local Development

### 1) Run Rails API

```bash
bundle install
bin/rails db:prepare
bin/rails server
```

### 2) Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Default Vite URL: `http://localhost:5173`.

## Production Build

```bash
cd frontend
npm ci
npm run build
npm run preview
```

## Security Notes (JWT)

- Current implementation stores JWT in `localStorage` for simple SPA compatibility.
- **Recommended production hardening**: issue auth tokens via secure, `HttpOnly`, `SameSite=Strict` cookies from Rails and add CSRF protections.
- Route protection and role-based rendering are enforced in the client through `PrivateRoute` and role checks.

## Key Frontend Features

- Login/Register forms with validation
- Dashboard with stats + recent activity
- Case CRUD + filtering
- Document upload and document list viewer
- User profile management
- Audit logs viewer (admin only)
- Error and loading states
- Dark mode toggle
- Toast notifications
- Lazy-loaded route chunks

## CI/CD Compatibility

The frontend includes deterministic scripts usable from GitHub Actions/Jenkins:

- `npm ci`
- `npm run lint`
- `npm run build`

Recommended pipeline stage:

1. Install dependencies (`npm ci`)
2. Lint (`npm run lint`)
3. Build (`npm run build`)
4. Publish static `frontend/dist`

## Deployment Suggestions

### Vercel

- Root directory: `frontend`
- Build command: `npm run build`
- Output: `dist`
- Environment variable: `VITE_API_BASE_URL`

### Netlify

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

### Docker (example)

Use a multi-stage build for frontend static assets and serve via Nginx or CDN. Pair with Rails API container from existing backend setup.
