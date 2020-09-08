# TODO

- [X] Opções de preservação de dados e mapa na troca de versões
- [ ] Gerenciamento de Usuários
- [X] Controle de RAM alocada pelo servidor
- [ ] Upload/Download de Mapa

# Minecraft-Server

Dashboard for Minecraft Server

## Installation

### Command

```bash
docker run -p 80:80 -p 25565:25565 -e ADMIN_USERNAME='admin' -e ADMIN_USERNAME='changeme' Giancarl021/Minecraft-Server
```

### Flags

* ``-p 80:80``: The Dashboard port
* ``-p 25565:25565``: The Minecraft Server port
* ``-e ADMIN_USERNAME='admin'``: The admin username, for first configuration
* ``-e ADMIN_USERNAME='admin'``: The admin password, for first configuration


## First configuration

### Accessing the dashboard

### Selecting a version


## Dashboard

### Start/Stop/Restart the server

### Send a command to server

### Change properties of the server


## User Management

### Roles

### Creating a new user

### Editing an existing user

### Removing a user


## Playing

### Accessing the server from localhost

### Accessing the server from local network

### Accessing the server from internet

## Development

### API

### Socket