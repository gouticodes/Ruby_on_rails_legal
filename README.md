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

### Where to run commands (important)

Run all `docker compose`, `docker-compose`, and `bundle` commands from the **project root directory** (the folder that contains `docker-compose.yml` and `Gemfile`).

```bash
cd /path/to/Ruby_on_rails_legal
pwd
# should end with .../Ruby_on_rails_legal
```

If you are not in the project root, Compose cannot find `docker-compose.yml` and Bundler may fail to locate the correct `Gemfile`.

### One command demo (for presentation / invigilator)

From project root, run:

```bash
chmod +x bin/demo
./bin/demo
```

This will build containers, start the app, run DB setup, and execute a smoke test before you present.

### Option A: Docker Compose plugin (new syntax)

```bash
docker compose up --build
```

### Option B: Legacy standalone Compose binary

If your machine shows `unknown flag: --build` or does not recognize `docker compose`, use:

```bash
docker-compose up --build
```

### Quick health check

```bash
docker compose version || docker-compose version
```

App: `http://localhost:3000`

### If bundler fails on `rake (13.4.2)`

Some environments fail with `An error occurred while installing rake (13.4.2)`.
This repository pins `rake` to the stable `13.2.x` line in `Gemfile`.

Try:

```bash
rm -f Gemfile.lock
bundle config set force_ruby_platform true
bundle install
```

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
