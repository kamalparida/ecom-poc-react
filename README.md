# Cartly

Local e-commerce POC with a React frontend and a Node/Express account API.

```
frontend/   React + Vite + TypeScript
backend/    Express register & login API (port 5000)
```

## Run locally

Use two terminals.

**1. Backend**

```bash
cd backend
npm install
npm start
```

API: `http://localhost:5000`  
Health check: `GET http://localhost:5000/api/health`

**2. Frontend**

```bash
cd frontend
npm install
npm run dev
```

UI: `http://localhost:5173`

The Vite dev server proxies `/api` to `http://localhost:5000`, so login and register work without CORS issues.

## Auth flow

1. Register at `/register` → `POST /api/register`
2. Redirect to `/login`
3. Sign in → `POST /api/login`
4. On success, go to home

### Register body (frontend → API)

```json
{
  "username": "pranavk01",
  "password": "secret123",
  "fullName": "John Doe",
  "email": "pk@test.com",
  "address": {
    "street": "123 Market Street",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94103"
  }
}
```

Required by the API: `username`, `password`. Extra fields are stored.

### Login body

```json
{
  "username": "pranavk01",
  "password": "secret123"
}
```

Users are stored as one JSON object per line in `backend/data/users.txt` (created on first start). Passwords are plain text — local POC only.
