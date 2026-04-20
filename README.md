# LegalOps Rails Platform

Enterprise-ready Ruby on Rails legal operations application with CI/CD via GitHub Actions.

## What this repository includes

- **Full backend architecture** for legal case management (clients, cases, documents, hearings).
- **Frontend foundation** using Rails views, reusable layout components, and responsive CSS.
- **CI pipeline** that runs on every push/PR for quality checks and tests.
- **CD pipeline** that builds and publishes a production container image when code is merged to the `production` branch.

## Core domain

- `Client`: Legal customer profile and contact details.
- `LegalCase`: Matter/case tracked by jurisdiction and status.
- `CaseDocument`: Case-related contracts/briefs/filings metadata.
- `Hearing`: Court hearing schedule and outcome notes.

## CI/CD Design

### CI (`.github/workflows/ci.yml`)

Runs on every commit and pull request to `main` and `production`:

1. Checkout code
2. Set up Ruby + Bundler cache
3. Boot PostgreSQL service container
4. Install gems
5. Run static checks (`rubocop`)
6. Run tests (`rspec`)

### CD (`.github/workflows/cd-production.yml`)

Runs when commits land on `production` branch:

1. Checkout code
2. Login to GitHub Container Registry (`ghcr.io`)
3. Build image from `Dockerfile`
4. Tag with SHA and `production-latest`
5. Push image to registry

## Local Development

```bash
docker compose up --build
```

App: `http://localhost:3000`

## Required GitHub Secrets

- `GITHUB_TOKEN` (automatic for Actions)

## Suggested branch strategy

- `main`: integration branch
- `production`: release branch (triggers deployment image build)

## Notes for beginners

- Work in feature branches.
- Open a Pull Request into `main`.
- After approval/testing, merge from `main` into `production`.
- Production merge automatically creates a fresh deployment artifact.
