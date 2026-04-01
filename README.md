# Softmind Assessment

## Project Overview

This repository contains a full-stack task management application built with:

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: MongoDB (Mongoose)
- Caching: Redis
- File uploads: Cloudinary
- API documentation: Swagger (`/api-docs`)

The app supports role-based workflows for `Admin`, `Manager`, and `User`, including task creation, assignment, filtering, status updates, and task attachments.

## Installation and Setup Instructions

### Prerequisites

- Node.js (18+ recommended)
- npm
- MongoDB (local or Atlas)
- Redis
- Cloudinary account (for attachments)

### 1) Clone and install dependencies

```bash
git clone https://github.com/abubkr468/softmind_assessment.git
cd softmind-assesment

cd server && npm install
cd ../frontend && npm install
```

### 2) Configure environment variables

#### Server (`server/.env`)

Copy from example and fill values:

```bash
cp server/.env.example server/.env
```

Required keys:

- `PORT` (example: `5001`)
- `MONGODB_URI`
- `REDIS_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `BCRYPT_SALT_ROUNDS`
- `CLIENT_ORIGIN` (frontend URL, e.g. `http://localhost:5173`)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

#### Frontend (`frontend/.env`)

Copy from example:

```bash
cp frontend/.env.example frontend/.env
```

Set:

- `VITE_API_URL=http://localhost:5001/api`

### 3) Run the application

In one terminal:

```bash
cd server
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173` and backend at `http://localhost:5001`.

## API Documentation

Swagger UI is available at:

- `http://localhost:5001/api-docs`

Main API groups include:

- Auth: signup, login, me, logout
- Users: list users (role-restricted)
- Tasks: create, list/filter, assign, update status, upload attachments
- Cache demo route

Most task and user routes are protected and require a Bearer token in the `Authorization` header:

```text
Authorization: Bearer <token>
```

## Contribution Guidelines

1. Create a feature branch from `main`:
   - `git checkout -b feat/your-feature-name`
2. Keep changes focused and follow existing project structure.
3. Run checks before opening PR:
   - Backend: `cd server && npm run build`
   - Frontend: `cd frontend && npm run build`
4. Open a pull request with:
   - clear summary
   - testing steps
   - screenshots (for UI changes), if applicable



