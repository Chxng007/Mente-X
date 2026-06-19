# ETAPA 1: Compilar la aplicación con Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente de Vite
COPY . .

# Construir la aplicación de Vite (genera la carpeta 'dist')
RUN npm run build

# ETAPA 2: Servir con Nginx
FROM nginx:alpine

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la carpeta 'dist' generada por Vite a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]