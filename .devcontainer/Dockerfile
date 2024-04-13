FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Core
RUN apt-get update \
  && apt-get install -y build-essential git dnsutils net-tools iputils-ping netcat libcurl4-openssl-dev libssl-dev socat ca-certificates curl gnupg


# Docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null \
  && apt-get update \
  && apt-get install -y docker-ce


# Backend
RUN apt-get install -y python3 python3-pip python3-dev python3-venv python-is-python3 libnss3

## Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/home/vscode/.poetry python -
RUN cp /home/vscode/.poetry/bin/poetry /usr/local/bin/

## Hatch
RUN pip install hatch


# Frontend
RUN mkdir -p /etc/apt/keyrings \
  && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list \
  && apt-get update && apt-get install nodejs -y \
  && corepack enable \
  && yarn set version 3.3.0


# Additional Tools

## Docker Compose
RUN curl -SL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o /usr/bin/docker-compose \
  && chmod +x /usr/bin/docker-compose \
  && usermod -aG docker vscode

## Lefthook
RUN curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' | sudo -E bash \
  && sudo apt install lefthook

## Invoke
RUN pip install invoke

# Wrap up
RUN chown -R vscode:vscode /home/vscode