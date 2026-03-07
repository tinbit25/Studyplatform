# AI-Integrated Personalized Study Platform

A scalable backend system for an AI-driven personalized learning platform.

## Architecture

The backend is built using a **Modular Monolith Architecture** designed to scale into microservices as the platform grows.

Tech Stack:

- NestJS (Fastify)
- MongoDB
- Redis
- BullMQ
- JWT Authentication
- Argon2 Password Hashing

## Project Structure

src

common/ # Shared utilities (guards, filters, interceptors)
config/ # Configuration management
infrastructure/ # Redis, queues, database adapters
modules/ # Domain modules

auth/ # Authentication
users/ # User management
profiling/ # Learning profile
quiz/ # Quiz engine
scheduling/ # Study planning
analytics/ # Performance analysis
events/ # Event tracking


## Features

- Secure authentication system
- AI-ready event data collection
- Adaptive study scheduling
- Quiz and assessment engine
- Performance analytics
- Scalable modular architecture

## Environment Variables

Create `.env` file:


PORT=3000
MONGO_URI=your_mongodb_connection
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=supersecret


## Running the Project

Install dependencies


npm install


Start development server


npm run start:dev


The API will run at:


http://localhost:3000


## API Example

### Register User

POST /auth/register

Request body:


{
"name": "John",
"email": "john@example.com
",
"password": "123456"
}


## Future Roadmap

- JWT authentication
- Role-based access control
- Quiz engine
- Adaptive study scheduler
- AI-driven recommendation system
- Microservices architecture
