# Minecon

Mine(craft)Con(tainerized) its a dashboard for Minecraft servers.

Full documentation [here](https://github.com/Giancarl021/Minecraft-Server#minecon).
## Installation

Docker is required for this application.
### Command

```bash
docker run -p 80:80 -p 25565:25565 -e "EULA=TRUE" -e "ADMIN_USERNAME=admin" -e "ADMIN_PASSWORD=changeme" -v "path/to/volume:/usr/app/data" giancarl021/minecon
```

### Flags

* ``-p 80:80``: The Dashboard port
* ``-p 25565:25565``: The Minecraft Server port
* ``-e EULA=TRUE``: Confirmation you read the EULA (Required)
* ``-e ADMIN_USERNAME=admin``: The admin username
* ``-e ADMIN_PASSWORD=changeme``: The admin password

## Azure SQL as Version database

For reasons of compatibility, the project allows the use of an Azure SQL instance as a Version database.
### Environment Variables

```env
USE_AZURE_SQL=<True|False>
SQL_USERNAME="<username>"
SQL_PASSWORD="<password>"
SQL_SERVER="<server>"
SQL_DATABASE="<database>"
```