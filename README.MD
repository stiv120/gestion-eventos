## API de Gestión de Eventos

API RESTful hecha en nodejs con docker para una plataforma de gestión de eventos. Esta plataforma
permitirá a los usuarios crear, promocionar y gestionar eventos de manera efectiva. Los
usuarios podrán registrarse para asistir a eventos al igual que ver detalles sobre los eventos
como información detallada o lugares cercanos.

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

### Iniciar aplicación

El comando de docker nos desplegará 5 réplicas de la aplicación en el puerto especificado: 3000, ya con esto tenemos acceso a la api.
Además de esto, en consola nos mostrará el link con la documentación de las api con swagger, todo esto nos aparecerá en nuestra consola.

### Conexión a la base de datos

Alojamos en nuestro contenedor de docker una imagen de phpmyadmin para administrar la bd ingresando al siguiente enlace http://localhost:8081/ esto nos llevará a la consola administrativa de phpmyadmin y podemos observar que ya está creada la base de datos events_db con las tablas para nuestra aplicación.
