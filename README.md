# URL_SHORTENER

A full-stack URL shortener built with **Node.js**, **Express**, and **PostgreSQL**. Paste a long URL, get a short link instantly, track clicks, and manage all your links from a clean frontend UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | — |
| Frontend | HTML, CSS, Vanilla JS (vibe coded with AI assistance) |

---

## Features

- Shorten any valid URL instantly
- Redirect via short code with automatic click tracking
- View stats (click count, original URL, ID) for any short code
- List all shortened URLs
- Delete a short URL
- Frontend built using vibe coding — designed and generated with AI assistance, then integrated manually

---

## Project Structure

```
URL_SHORTENER/
├── src/
│   ├── db.js           # PostgreSQL pool connection
│   └── routes/
│       └── url.js      # All route handlers
├── index.html          # Frontend UI (vibe coded)
├── app.js              # Express app entry point
├── .env                # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GaneshSeshagiri/URL_SHORTENER.git
cd URL_SHORTENER
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL

Create a database and run the following SQL to set up the table:

```sql
CREATE DATABASE urlshortener;

CREATE TABLE urls (
  id         SERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  long_url   TEXT NOT NULL,
  clicks     INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Configure environment variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/urlshortener
PORT=3000
```

### 5. Start the server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### 6. Open the frontend

Open `index.html` with VS Code Live Server or any local server running on port `5500`.

---

## API Routes

| Method | Route | Description |
|---|---|---|
| POST | `/shorten` | Shorten a long URL |
| GET | `/:shortId` | Redirect to original URL + increment click count |
| GET | `/stats/:shortId` | Get stats for a short URL |
| GET | `/all` | Get all shortened URLs |
| DELETE | `/delete/:shortId` | Delete a short URL |

### Example — Shorten a URL

**Request:**
```http
POST /shorten
Content-Type: application/json

{
  "long_url": "https://www.example.com/some/very/long/path"
}
```

**Response:**
```json
{
  "msg": "url shortened",
  "data": {
    "id": 1,
    "short_code": "kX92mPq",
    "long_url": "https://www.example.com/some/very/long/path",
    "clicks": 0,
    "created_at": "2026-04-09T06:00:00.000Z"
  }
}
```

### Example — Get Stats

**Request:**
```http
GET /stats/kX92mPq
```

**Response:**
```json
{
  "id": 1,
  "short_url": "kX92mPq",
  "long_url": "https://www.example.com/some/very/long/path",
  "clicks": 5
}
```

---

## Frontend

The frontend (`index.html`) was built using **vibe coding** — an AI-assisted development approach where the UI was designed and generated with the help of Claude (AI), then integrated and tested manually. It connects directly to the backend REST API running on `localhost:3000`.

Features:
- Shorten URLs with one click and copy the result instantly
- View all links in a live table with click counts and delete buttons
- Look up stats for any short code

> To run the frontend, open `index.html` using **VS Code Live Server** (port 5500). Make sure CORS is enabled in `app.js`.

---

## Dependencies

```json
{
  "express": "^4.x",
  "pg": "^8.x",
  "nanoid": "^3.x",
  "dotenv": "^16.x",
  "cors": "^2.x"
}
```

Dev:
```json
{
  "nodemon": "^3.x"
}
```

---

## .gitignore

```
node_modules/
.env
```

---

## Author

**Ganesh Seshagiri** — [github.com/GaneshSeshagiri](https://github.com/GaneshSeshagiri)
