# Ruby on Rails Legal Application

Enterprise-grade Rails application for legal operations, with a professional CI/CD pipeline powered by **GitHub Actions**.

## CI/CD Design

The pipeline automates the full delivery lifecycle:

1. **Continuous Integration (every commit and PR)**
   - Install dependencies
   - Prepare PostgreSQL test database
   - Run RSpec tests
2. **Continuous Delivery (merge/push to `production`)**
   - Build Docker image from root `Dockerfile`
   - Tag image for traceability (`production-latest` + commit SHA)
   - Publish image to GitHub Container Registry (GHCR)

## Workflow File

- `.github/workflows/rails-cicd.yml`

## Branch Strategy

- All branches and PRs trigger CI testing.
- Only pushes to `production` trigger container artifact creation/publishing.

## Required GitHub Settings

- Ensure GitHub Actions is enabled.
- Protect `production` branch and require passing checks.
- Repository must allow package publishing to GHCR.

## Required Secrets/Permissions

This workflow uses:

- `GITHUB_TOKEN` (built-in, used for GHCR push)

## Local Development

```bash
docker compose up --build
```

## Pipeline Summary

- **Fast feedback loop:** every commit tested.
- **Reliable releases:** production merges produce immutable container artifacts.
- **Enterprise ready:** deterministic build and publish stages with branch-gated deployment behavior.
