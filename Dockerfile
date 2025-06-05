# Etapa base para desarrollo
FROM node:18

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de desarrollo de React
EXPOSE 3000

# Activar hot reload si lo necesitas (opcional pero recomendable en Docker)
ENV CHOKIDAR_USEPOLLING=true

# Comando por defecto: iniciar el servidor de desarrollo
CMD ["npm", "start"]
