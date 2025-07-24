# Multi-Environment Node.js CI/CD Pipeline with Docker, GitHub Actions & DigitalOcean

## Overview

This project demonstrates a complete DevOps workflow by deploying a containerized Node.js application to **three distinct environments** — `development`, `qualityassurance`, and `production` — hosted on a single **DigitalOcean droplet**. The project uses **GitHub Actions** for automated CI/CD pipelines, **Docker** for containerization, and optional **NGINX** for routing.

The deployment strategy is based on Git branch separation, where each branch (`development`, `qualityassurance`, `production`) is linked to a specific environment. On every push to these branches, GitHub Actions builds and deploys the respective Docker container to the appropriate environment on the droplet.


## Project Structure

```
node-app/
│
├── .github/
│   └── workflows/
│       └── docker-build.yml        # Shared GitHub Actions workflow
│
├── development/                    # Dev environment
│   ├── Dockerfile
│   ├── .env
│   └── app.js
│
├── qualityassurance/              # QA environment
│   ├── Dockerfile
│   ├── .env
│   └── app.js
│
├── production/                    # Production environment
│   ├── Dockerfile
│   ├── .env
│   └── app.js
│
└── README.md                      # This file
```


## Setup Process

### 🛠️ Day 1: Project Setup

* Installed Node.js and created a minimal Express app.
* Dockerized the app using a Dockerfile.
* Tested the app locally with `docker build` and `docker run`.

### 🔄 Day 2: CI/CD Setup with GitHub Actions

* Created `.github/workflows/docker-build.yml`.
* The workflow performs the following on each push:

  * Builds Docker image
  * Pushes it to Docker Hub
  * SSHs into the droplet and deploys the app
* Set up GitHub Secrets:

  * `DOCKER_USERNAME`
  * `DOCKER_PASSWORD`
  * `DROPLET_IP`
  * `SSH_PRIVATE_KEY`

### ☁️ Day 3: Deploy to Droplet

* Created a fresh DigitalOcean droplet (Ubuntu).
* Installed Docker and Docker Compose.
* Set up SSH keys to enable passwordless login.
* Tested app deployment manually on the droplet.

### 🧪 Day 4: Environment Separation

* Created three folders: `development/`, `qualityassurance/`, `production/`
* Each folder has its own Dockerfile, `.env`, and `app.js` file.
* Mapped to different ports:

  * `production` → 3000:3000
  * `qualityassurance` → 3002:3002
  * `development` → 3001:3001

### 🌐 Day 5: Domain Names (Skipped / Optional)

* No custom domains were used due to learning purpose.
* NGINX or domain configuration is optional and future-facing.

### 🔁 Day 6: CI/CD for All Environments

* Verified each branch (`development`, `qualityassurance`, `production`) can:

  * Trigger CI/CD independently
  * Build & deploy its respective app version
* Ensured GitHub workflows are branch-aware and environment-specific.
* Validated that updates to any branch only affect the corresponding environment.

### 🧹 Day 7: Final Cleanup and Docs

* Reviewed and cleaned up GitHub Secrets.
* Ensured all CI/CD workflows worked for all 3 branches.
* Wrote this README and documented everything.


## GitHub Actions Workflow Details

The workflow is configured in `.github/workflows/docker-build.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - production
      - development
      - qualityassurance

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Log in to DockerHub
        run: echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}

      - name: Set Environment Variables
        run: |
          if [[ $GITHUB_REF_NAME == 'production' ]]; then
            echo "FOLDER=production" >> $GITHUB_ENV
            echo "PORT=3000" >> $GITHUB_ENV
          elif [[ $GITHUB_REF_NAME == 'development' ]]; then
            echo "FOLDER=development" >> $GITHUB_ENV
            echo "PORT=3001" >> $GITHUB_ENV
          elif [[ $GITHUB_REF_NAME == 'qualityassurance' ]]; then
            echo "FOLDER=qualityassurance" >> $GITHUB_ENV
            echo "PORT=3002" >> $GITHUB_ENV
          fi

      - name: Build Docker Image
        run: docker build -t $DOCKER_USERNAME/node-app:${GITHUB_REF_NAME} ./${{ env.FOLDER }}

      - name: Push Docker Image
        run: docker push $DOCKER_USERNAME/node-app:${GITHUB_REF_NAME}

      - name: Deploy to Droplet via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.DROPLET_IP }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker stop node-${GITHUB_REF_NAME} || true
            docker rm node-${GITHUB_REF_NAME} || true
            docker pull $DOCKER_USERNAME/node-app:${GITHUB_REF_NAME}
            docker run -d -p ${{ env.PORT }}:3000 --name node-${GITHUB_REF_NAME} $DOCKER_USERNAME/node-app:${GITHUB_REF_NAME}
```


## Example Environment Variables

**`production/.env`**

```
ENVIRONMENT=production
GREETING=Welcome to Production
```

**`development/.env`**

```
ENVIRONMENT=development
GREETING=Welcome to Dev
```

**`qualityassurance/.env`**

```
ENVIRONMENT=qa
GREETING=This is QA!
```

Each `app.js` reads this `.env` and shows the greeting on startup.


## How to Deploy Changes

To deploy updates:

```bash
git checkout development  # or qualityassurance or production
# make changes

git add .
git commit -m "Update dev greeting"
git push origin development
```

GitHub Actions will auto-build and deploy that version.


## Learnings and Takeaways

* CI/CD branching strategy for multi-environment apps
* GitHub Actions with Docker image builds and SSH deploys
* Secrets management and secure automation
* Deploying Node.js apps with environment isolation
* End-to-end DevOps workflow — from local to cloud


## Future Improvements

* Add NGINX to reverse proxy to subdomains (e.g., `dev.example.com`, `qa.example.com`)
* HTTPS using Let's Encrypt
* Add unit tests and run them during CI
* Use Docker Compose and shared volume config for easier maintenance
* Add rollback steps in CI for failed deploys




## Final Notes

This was a comprehensive DevOps exercise simulating a real-world deployment pipeline. It’s fully automated, secure, scalable, and ready to extend into a professional setup with domains, testing, and monitoring.


*Authored by \[OSSAI CHIBUZO MALACHI]*
