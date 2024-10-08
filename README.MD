## API de Gestión de Eventos

API RESTful hecha en nodejs con docker para una plataforma de gestión de eventos. Esta plataforma
permitirá a los usuarios crear, promocionar y gestionar eventos de manera efectiva. Los
usuarios podrán registrarse para asistir a eventos al igual que ver detalles sobre los eventos
como información detallada o lugares cercanos.

Nota: para este proyecto debemos tener instalado docker, si no lo tienes instalado este es el enlace para descargar de acuerdo a nuestro sistema operativo: https://www.docker.com/products/docker-desktop/, tener instalado git, por acá dejo el enlace por si no lo tienen: https://git-scm.com/downloads y node.js (no es necesario ya que viene instalado en nuestro docker compose, pero si queremos usar los comandos de npm en nuestra maquina local debemos tenerlo instalado) por acá de la instalación: https://nodejs.org/en/download/package-manager

## Instalación

1. Primero clonamos el repositorio:

```sh
git clone https://github.com/stiv120/gestion-eventos
```

2. accedemos al directorio en la ruta en que lo descarguemos:

```sh
cd gestion-eventos
```

3. Como está alojado en una imagen de docker, ejecutamos el siguiente comando:

```sh
docker compose up
```

Nota: después de cargar nuestra aplicación, si queremos acceder a nuestro contenedor de la aplicación para ver los archivos , primero añadimos otra terminal en nuestro editor y consultamos nuestra lista de contenedores activos para saber el nombre de nuestro contenedor creado, mediante el siguiente comando:

```sh
docker ps
```

En la consola nos mostrará la lista en la cual podemos observar nuestros contenedores creados, en el cual copiamos el nombre y ejecutamos el siguiente comando para poder acceder a nuestro contenedor:

```sh
docker exec -it gestion-eventos_app_1 bash
```

Ya con esto estamos dentro del contenedor y podemos usar los comandos de npm sin ningún problema, por si no lo tenemos instalado en nuestra máquina local, es opcional.

### Iniciar aplicación

El comando de docker nos desplegará 5 réplicas de la aplicación en el puerto especificado: 3000, ya con esto tenemos acceso a la api.
Además de esto, en consola nos mostrará el link con la documentación de las api con swagger, todo esto nos aparecerá en nuestra consola: http://localhost:3000/api-docs.

### Conexión a la base de datos

Alojamos en nuestro contenedor de docker una imagen de phpmyadmin para administrar la bd ingresando al siguiente enlace http://localhost:8081/ esto nos llevará a la consola administrativa de phpmyadmin y podemos observar que ya está creada la base de datos events_db con las tablas para nuestra aplicación.
