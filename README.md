# Minecon

Mine(craft)Con(tainerized) its a dashboard for Minecraft servers
## Installation

### Command

```bash
docker run -p 80:80 -p 25565:25565 -e EULA=TRUE -e ADMIN_USERNAME='admin' -e ADMIN_PASSWORD='changeme' -v path/to/file:/usr/app/data giancarl021/minecon
```

### Flags

* ``-p 80:80``: The Dashboard port
* ``-p 25565:25565``: The Minecraft Server port
* ``-e EULA=TRUE``: Confirmation you read the EULA (Required)
* ``-e ADMIN_USERNAME='admin'``: The admin username, for first configuration
* ``-e ADMIN_USERNAME='admin'``: The admin password, for first configuration


## First configuration

### Accessing the dashboard

### Selecting a version

## Dashboard

### Start/Stop/Restart the server

### Send a command to server

### Change properties of the server

## Playing

### Accessing the server from localhost

### Accessing the server from local network

### Accessing the server from internet

## Development

### API

### Socket