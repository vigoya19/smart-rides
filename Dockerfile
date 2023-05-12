# Imagen de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json a la imagen
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente a la imagen
COPY . .

# Compilar la aplicación
RUN npm run build



RUN npm run migration:run

# Asignar permisos de ejecución al archivo entrypoint.sh
# RUN chmod +x entrypoint.sh

# Define la variable de entorno
ENV DB_HOST ''
ENV DB_PORT ''
ENV DB_USERNAME ''
ENV DB_PASSWORD ''
ENV DB_NAME ''
ENV PAYMENT_BASE_URL ''
ENV PAYMENT_PRIVATE_TOKEN ''
ENV PAYMENT_PUBLIC_TOKEN ''

# Puerto expuesto
EXPOSE 3000

# Iniciar la aplicación
CMD ["./entrypoint.sh"]
