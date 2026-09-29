# Code Classic

Code Classic is a technology learning and knowledge-sharing platform. This repository contains the Spring Boot backend, React frontend, and local PostgreSQL foundation.

## Prerequisites

- Java 17 and Maven 3.9+
- Node.js 22+ and npm 11+
- Docker Desktop with Compose v2

Verify versions with `java -version`, `mvn -version`, `node --version`, `npm --version`, and `docker compose version`.

## First setup

From the repository root:

```powershell
Copy-Item .env.example .env
docker compose up -d postgres
Push-Location frontend; npm install; Pop-Location
```

The example password is for local development only. Never place production credentials in `.env.example` or tracked files.

## Run locally

Use separate terminals from the repository root:

```powershell
Push-Location backend; mvn spring-boot:run; Pop-Location
```

```powershell
Push-Location frontend; npm run dev; Pop-Location
```

Open <http://localhost:5173>. The page calls `GET http://localhost:8080/api/v1/health` and shows the backend connection state. The backend also exposes the safe operational check at <http://localhost:8080/actuator/health>.

### Port overrides

If port 8080 is already used by another local service, start the backend and frontend on the same alternate API port:

```powershell
$env:SERVER_PORT = "8081"
$env:DB_URL = "jdbc:postgresql://localhost:5432/codeclassic"
$env:DB_USERNAME = "codeclassic"
$env:DB_PASSWORD = "<local-database-password>"
$env:FRONTEND_URL = "http://localhost:5173"
Push-Location backend; mvn spring-boot:run; Pop-Location
```

In a second terminal, configure Vite before starting it:

```powershell
$env:VITE_API_BASE_URL = "http://localhost:8081"
Push-Location frontend; npm run dev; Pop-Location
```

Use the same port in the backend `SERVER_PORT` and frontend `VITE_API_BASE_URL`. The frontend and backend must also agree on the browser origin through `FRONTEND_URL` and CORS. Do not commit the local password or `.env`.

## Checks

```powershell
Push-Location backend; mvn test; Pop-Location
Push-Location frontend; npm test; npm run build; Pop-Location
```

Flyway applies migrations automatically when the backend starts. Do not edit an applied migration; add the next versioned file under `backend/src/main/resources/db/migration/`.

## Stop and restart

```powershell
docker compose down
docker compose up -d postgres
```

The named `postgres_data` volume persists local data. To intentionally delete local data, run `docker compose down -v`.

## Troubleshooting

- `DB_PASSWORD` is missing: copy `.env.example` to `.env` and set a local value.
- PostgreSQL is not healthy: run `docker compose logs postgres` and check that port 5432 is available.
- The frontend reports the backend is unavailable: confirm the backend is running on the port configured by `SERVER_PORT` and that `VITE_API_BASE_URL` points to the same port.
- A port is busy: set `SERVER_PORT` or change the frontend Vite port, then update `VITE_API_BASE_URL` and `FRONTEND_URL` together.

## Repository layout

- `backend/`: Spring Boot application, API, and Flyway migrations.
- `frontend/`: React and TypeScript Vite application.
- `infrastructure/`: deployment and infrastructure configuration.
- `docs/`: architecture decisions and user stories.
- `.github/workflows/`: CI workflows.
