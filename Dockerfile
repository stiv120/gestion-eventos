# Definimos la versión de node en que vamos a construir la aplicación.
FROM node:20

# Definimos el directorio de trabajo
WORKDIR /gestion-eventos

# Copimos el package.json y package-lock.json para optimizar el caching de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Copiamos el archivo de ejemplo .env
COPY .env.example .env

# Exponemos el puerto que usará la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]