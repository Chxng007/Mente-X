# DanzApp Backend

Backend API para DanzApp, una PWA enfocada en la comunidad de danza de Cartagena y la Costa Caribe Colombiana.

## Tecnologias

- Java 17
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Docker / Docker Compose

## Desarrollo local

Para ejecutar los tests:

```bash
./mvnw test
```

En Windows:

```powershell
.\mvnw.cmd test
```

## Docker

Levanta PostgreSQL, la API y el frontend React:

```bash
docker compose up --build
```

Los servicios quedan disponibles en:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
Postgres: localhost:5432
```

El frontend usa esta URL para llamar a la API:

```text
http://localhost:8080
```

Servicios incluidos:

- `app`: backend Spring Boot.
- `frontend`: frontend React con Vite.
- `db`: PostgreSQL 16 con volumen persistente.

Variables principales:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`

Para detener los contenedores:

```bash
docker compose down
```

Para borrar tambien el volumen de PostgreSQL:

```bash
docker compose down -v
```
