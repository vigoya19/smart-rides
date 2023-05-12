#!/bin/sh
# entrypoint.sh

# Cambiar al directorio del proyecto
cd /app
echo "install dependencies..."
npm install

echo "Execute migrations..."
npm run migration:run

echo "Init app..."
npm run start