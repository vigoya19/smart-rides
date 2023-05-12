#!/bin/sh
# entrypoint.sh

# Cambiar al directorio del proyecto
cd /app

echo "Ejecutando migraciones..."
npm run migration:run

echo "Iniciando la app..."
npm run start