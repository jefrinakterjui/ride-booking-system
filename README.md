# Ride Booking System - Backend API

## Project Overview

This project is a secure, scalable, and role-based backend API for a ride-booking system, similar to platforms like Uber or Pathao. Built with **Express.js**, **TypeScript**, and **MongoDB (with Mongoose)**, it provides a complete solution for managing riders, drivers, and ride lifecycles.

The system supports three distinct user roles:
* **Rider**: Can request rides, view their ride history, and cancel requests.
* **Driver**: Can view available ride requests, accept them, update the ride status throughout the journey, and track their earnings.
* **Admin**: Has full oversight of the system, including managing user accounts, approving/suspending drivers, and viewing all ride data.

Key features include JWT-based authentication, role-based authorization for all sensitive endpoints, secure password hashing, and a modular code architecture for maintainability and scalability.

---
## Setup & Environment Instructions

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or later recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/) (either a local instance or a cloud-based service like MongoDB Atlas)
* [Postman](https://www.postman.com/) (for API testing)

### Installation & Setup
1.  **Clone the repository:**
    ```bash
    git clone <your_repository_url>
    cd ride-booking-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables.
    ```env
    NODE_ENV=development
    PORT=8080
    MONGODB_URI=mongodb+srv://ride-booking-system:D7fO6DngnKOpzX3m@cluster0.yrzsv.mongodb.net/ride-booking-system?retryWrites=true&w=majority&appName=Cluster0
    
    # JWT Settings
    JWT_ACCESS_SECRET=tour_management_backend
    JWT_ACCESS_EXPIRES=2d
    JWT_REFRESH_SECRET=JWT_REFRESH_SECRET
    JWT_REFRESH_EXPIRES=30d
    ```

4.  **Build the project:**
    This command compiles the TypeScript code into JavaScript in the `dist` folder.
    ```bash
    npm run build
    ```

5.  **Run the server:**
    This command starts the server in development mode with auto-reloading.
    ```bash
    npm run start:dev
    ```
    For production, use:
    ```bash
    npm start
    ```
The server will be running on `http://localhost:8080`.

---
## API Endpoints Summary

The base URL for all endpoints is `/api/v1`.

### Authentication Endpoints
| Method | Endpoint | Description |
| :--- | :--- |:---|
| `POST` | `/auth/register` | Register a new user as a `RIDER` or `DRIVER`. |
| `POST` | `/auth/login` | Log in to get `accessToken` and `refreshToken`. |

### User Profile Endpoints
| Method | Endpoint | Role | Description |
| :--- | :--- | :--- |:---|
| `GET` | `/users/profile/me` | `RIDER`, `DRIVER`, `ADMIN` | Get the profile of the currently logged-in user. |

### Rider Endpoints (Ride Management)
| Method | Endpoint | Role | Description |
| :--- | :--- | :--- |:---|
| `POST` | `/rides/request` | `RIDER` | Request a new ride with location data. |
| `GET` | `/rides/my-history` | `RIDER` | Get the ride history for the logged-in rider. |
| `PATCH`| `/rides/:id/cancel` | `RIDER` | Cancel a ride that has been requested. |

### Driver Endpoints
| Method | Endpoint | Role | Description |
| :--- | :--- | :--- |:---|
| `PATCH`| `/drivers/me/availability` | `DRIVER` | Set availability status to `ONLINE` or `OFFLINE`. |
| `GET` | `/rides/available` | `DRIVER` | Get a list of all available ride requests. |
| `PATCH`| `/rides/:id/accept` | `DRIVER` | Accept a ride request. |
| `PATCH`| `/rides/:id/status` | `DRIVER` | Update the status of an ongoing ride. |
| `GET` | `/drivers/me/earnings` | `DRIVER` | Get earnings history for the logged-in driver. |

### Admin Endpoints
| Method | Endpoint | Role | Description |
| :--- | :--- | :--- |:---|
| `GET` | `/admin/users` | `ADMIN` | Get a list of all users in the system. |
| `PATCH`| `/admin/users/:id` | `ADMIN` | Update any user's information (e.g., block user, approve driver). |
| `GET` | `/rides/all-rides` | `ADMIN` | Get a list of all rides in the system. |
