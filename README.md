# Tutoriam
Tutoriam is a scalable, full-stack e-learning platform that enables instructors to create, manage, and monetize courses, while offering students a seamless and engaging learning experience. Built with a modern TypeScript stack (React + Vite frontend, Node.js + Express backend, MongoDB), Tutoriam is designed with extensibility, performance, and security in mind.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Authentication** – JWT-based authentication with refresh tokens.
- **Role-Based Dashboards** – Separate views for Admin, Instructor, and Student.
- **Course Management** – CRUD operations, curriculum builder, video uploads.
- **Enrollment & Payments** – Integrated payment gateway (Stripe).
- **Real-Time Chat & Notifications** – Powered by Socket.IO.
- **Reviews, Ratings & Certificates** – For better engagement.
- **Admin Panel** – Manage users, courses, payouts, and content.
- **Responsive UI** – Mobile-first and accessible design.
- **Scalable API** – Modular RESTful API with Repository Architecture.
- **Cloud Storage** – Media uploads via Cloudinary.

## Tech Stack

### Frontend
- **React + TypeScript + Vite**
- **Redux Toolkit** – State Management
- **ShadCN UI** – UI Components
- **Axios** – HTTP Client

### Backend
- **Node.js + Express + TypeScript**
- **MongoDB + Mongoose**
- **Repository & Service Layer Architecture**
- **Socket.IO** – Real-Time Communication

### Others
- **Stripe** – Payments
- **Cloudinary** – Media Storage
- **Docker + Docker Compose** – Containerization

## Architecture

Tutoriam follows a modular, layered architecture:

- **Frontend (React + Vite)** – Handles the user interface, routing, and API calls.
- **Backend (Node + Express)** – Provides REST API endpoints with a service-repository pattern.
- **Database (MongoDB)** – Stores users, courses, enrollments, transactions, and messages.
- **Real-Time Layer (Socket.IO)** – Manages chats and live notifications.
- **Cloud Storage (Cloudinary)** – Stores images and videos.
- **Payments (Stripe)** – Handles course purchases and payouts.

## Project Structure

<pre> ```plaintext tutoriam/ │ ├── frontend/ # React + Vite client │ ├── src/ │ │ ├── components/ # UI and feature components │ │ ├── context/ # Context providers │ │ ├── hooks/ # Custom hooks │ │ ├── lib/ # Axios, socket, utils │ │ ├── pages/ # Route-level pages │ │ ├── redux/ # Store, slices, thunks │ │ ├── routes/ # Route definitions │ │ ├── services/ # API service functions │ │ └── types/ # TypeScript types │ └── public/ # Static assets │ ├── backend/ # Node.js + Express API │ ├── src/ │ │ ├── config/ # App config (db, cloud, payments) │ │ ├── controllers/ # Request handlers │ │ ├── core/ # Abstracts, interfaces │ │ ├── di/ # Dependency injection setup │ │ ├── dtos/ # Data Transfer Objects │ │ ├── infrastructure/ # Socket, external services │ │ ├── middlewares/ # Express middlewares │ │ ├── models/ # Mongoose models │ │ ├── repositories/ # Data access layer │ │ ├── routes/ # API routes │ │ ├── services/ # Business logic │ │ └── utils/ # Helper functions │ └── docker-compose.yml # Docker orchestration ``` </pre>

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18+
- **npm** or **yarn**
- **MongoDB** (local instance or cloud, e.g., MongoDB Atlas)
- **Docker** & **Docker Compose** (optional, for containerized setup)

## Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sahshad/tutoriam.git
cd tutoriam

2️⃣ Install Backend Dependencies

cd backend
npm install

3️⃣ Install Frontend Dependencies

cd ../frontend
npm install

4️⃣ Set Up Environment Variables
Make sure to configure environment variables for both frontend and backend. See the Environment Variables section below.

5️⃣ Run the Application (Development)
Use two separate terminals:

Terminal 1 – Backend

cd backend
npm run dev

Terminal 2 – Frontend

cd frontend
npm run dev

## Environment Variables

You need to configure environment variables for both the **Backend** and **Frontend** before running the app.

---

### 🔐 Backend (`backend/.env`)

PORT=5000
MONGO_URI=mongodb://localhost:27017/tutoriam
CLIENT_URL=http://localhost:5173

JWT_TOKEN_SECRET=your_jwt_token_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

REDIS_URL=redis://localhost:6379

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_ID=your_oauth_client_id
CLIENT_SECRET=your_oauth_client_secret

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

🌐 Frontend (frontend/.env)

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_BASE_URL_FOR_SOCKET=http://localhost:5000


## Scripts

### Backend

```bash
npm run dev       # Development mode
npm run build     # Compile TypeScript
npm start         # Start in production

### Frontend

npm run dev       # Development mode
npm run build     # Build for production
npm run preview   # Preview build

## Docker Setup

### Run everything:

```bash
docker-compose up --build

Run services individually:

# Backend
docker build -t tutoriam-backend ./backend
docker run -p 5000:5000 tutoriam-backend

# Frontend
docker build -t tutoriam-frontend ./frontend
docker run -p 5173:5173 tutoriam-frontend

## Contributing

We welcome contributions! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes and push to your branch.
4. Open a pull request for review.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
