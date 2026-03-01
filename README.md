# SpeechFlow Journey Builder

A speech therapy web application that guides users through personalised speech-improvement journeys powered by AI. Users can practice pronunciation, track progress over time, and receive real-time AI feedback via Google Gemini.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Radix UI |
| State / Data | TanStack Query, React Hook Form |
| Backend | Express.js (Node.js) |
| Database | MongoDB (Mongoose) |
| AI | Google Generative AI (Gemini), Google TTS |
| Mobile | Capacitor |

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** – a local instance (`mongodb://localhost:27017`) or a MongoDB Atlas URI
- A **Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Project Structure

```
speechflow-journey-builder/
├── src/               # React + TypeScript frontend
│   ├── components/    # UI components (Radix-based)
│   ├── context/       # React context providers
│   ├── hooks/         # Custom hooks (auth, speech, TTS)
│   ├── pages/         # Route-level page components
│   └── services/      # API client (fetch wrappers)
├── server/            # Express.js backend
│   ├── middleware/    # JWT authentication middleware
│   ├── models/        # Mongoose schemas
│   └── routes/        # REST API route handlers
└── .github/workflows/ # CI/CD pipeline
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nyagol-dev/speechflow-journey-builder.git
cd speechflow-journey-builder
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) below for details on each variable.

### 3. Install dependencies

```bash
# Install root (frontend) dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..
```

### 4. Run in development

The following command starts both the Vite dev server (port 8080) and the Express API server (port 5000) concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

### 5. Build for production

```bash
npm run build
```

The compiled frontend is output to `dist/`. Serve the Express server in production with:

```bash
cd server && npm start
```

## Environment Variables

Copy `.env.example` to `.env` in the **project root** and set the following:

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret used to sign JWT tokens (min. 32 random characters) |
| `GEMINI_API_KEY` | ✅ | Google Generative AI (Gemini) API key |
| `PORT` | Optional | Express server port (default: `5000`) |
| `CLIENT_ORIGIN` | Optional | Frontend URL for CORS (default: `http://localhost:8080`) |

## API Endpoints

### Auth (`/api/auth`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/signup` | Public | Register a new user |
| POST | `/login` | Public | Authenticate and receive a JWT |
| GET | `/me` | Bearer | Get the current user's profile |

### AI (`/api/ai`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/speech-to-text` | Bearer | Transcribe audio via Gemini |
| POST | `/text-to-speech` | Bearer | Synthesise speech from text |

> AI routes are rate-limited to **30 requests / 15 minutes** per IP to protect paid API quota.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run dev:client` | Start Vite dev server only |
| `npm run dev:server` | Start Express server only (with nodemon) |
| `npm run build` | Production build of the frontend |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint on the frontend source |
| `npm run typecheck` | TypeScript type checking (no emit) |

## Security

- Passwords are hashed with **bcrypt** (cost factor 10).
- API routes are protected with **JWT Bearer** tokens (30-day expiry).
- CORS is configured to **only allow the origin** specified in `CLIENT_ORIGIN`.
- AI routes are **rate-limited** to prevent abuse of paid AI APIs.
- The `Content-Security-Policy` can be configured via your hosting provider or a reverse proxy.

## License

[MIT](LICENSE)


