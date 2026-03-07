# AI-Integrated Personalized Study Platform

A scalable backend system for an **AI-driven personalized learning platform** designed to analyze student behavior, generate adaptive study plans, and provide performance insights.

---

# Architecture

The backend follows a **Modular Monolith Architecture** that can evolve into **microservices** as the platform grows.

This approach provides:

- Clear module boundaries
- Easier maintenance
- High scalability
- Smooth transition to distributed systems

---

# Tech Stack

- **NestJS (Fastify)** – High-performance backend framework
- **MongoDB** – NoSQL database for flexible data storage
- **Redis** – Caching and fast data access
- **BullMQ** – Background job processing
- **JWT Authentication** – Secure user authentication
- **Argon2** – Password hashing

---

# Project Structure

```
src
│
├── common/              # Shared utilities
│   ├── filters/         # Exception filters
│   ├── guards/          # Authentication & authorization guards
│   └── interceptors/    # Request/response interceptors
│
├── config/              # Application configuration
│
├── infrastructure/      # External services integration
│   ├── database/        # MongoDB setup
│   ├── redis/           # Redis connection
│   └── queue/           # BullMQ queues
│
└── modules/             # Core business modules
    ├── app/             # Root module
    ├── auth/            # Authentication
    ├── users/           # User management
    ├── profiling/       # Learning profile system
    ├── quiz/            # Quiz engine
    ├── scheduling/      # Study planning
    ├── analytics/       # Performance analysis
    └── events/          # Event tracking
```

---

# Core Features

- Secure authentication system
- AI-ready event data collection
- Adaptive study scheduling
- Quiz and assessment engine
- Learning behavior tracking
- Performance analytics
- Scalable modular architecture

---

# Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=supersecret
```

---

# Installation

Clone the repository:

```
git clone https://github.com/tinbit25/Studyplatform.git
```

Navigate to the project folder:

```
cd ai-study-platform
```

Install dependencies:

```
npm install
```

---

# Running the Project

Start the development server:

```
npm run start:dev
```

The API will run at:

```
http://localhost:3000
```


---

