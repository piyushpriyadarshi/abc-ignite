
# Class Booking System  

A fully-featured RESTful API for managing classes, bookings, and users, built with **Node.js**, **Fastify**, and **SQLite**.  

This project follows a **microservices architecture** with a modular and scalable design, focusing on **domain-driven design (DDD)** principles.  

---

## 📖 Table of Contents  

- [Class Booking System](#class-booking-system)
  - [📖 Table of Contents](#-table-of-contents)
  - [🌟 Features](#-features)
  - [🏗️ Architecture](#️-architecture)
    - [Folder Structure](#folder-structure)
  - [🛠️ Technology Stack](#️-technology-stack)
  - [📋 API Endpoints](#-api-endpoints)
    - [Classes](#classes)
    - [Bookings](#bookings)
  - [🚀 Installation and Running](#-installation-and-running)

---

## 🌟 Features  

- Modular and scalable microservices architecture.  
- API-first development with clean endpoint design.  
- SQLite integration for lightweight, file-based database management.  
- Comprehensive API documentation via Fastify's built-in Swagger/OpenAPI support.  
- Error handling, validation, and robust transaction support.  
- Environment variable-driven configuration for flexibility.  
- Extendable service layer to support additional domains like payments, notifications, etc.  

---

## 🏗️ Architecture  

The system is divided into multiple layers:  

1. **Service Layer**: Contains the business logic for each domain (e.g., classes, bookings, users).  
2. **Data Access Layer**: Encapsulates SQLite database interactions using reusable repository patterns.  
3. **API Gateway**: A Fastify server acting as the single entry point for all API requests, managing routing, validation, and response handling.  

### Folder Structure  



## 🛠️ Technology Stack  

- **Runtime**: [Node.js](https://nodejs.org/)  
- **Web Framework**: [Fastify](https://www.fastify.io/)  
- **Database**: [SQLite](https://sqlite.org/)  
- **Language**: TypeScript  

---

## 📋 API Endpoints  

### Classes  

- `POST /classes` - Create a new class.  
- `GET /classes` - Retrieve a list of all classes.  
- `GET /classes/:id` - Retrieve a specific class by ID.  
- `PUT /classes/:id` - Update a specific class by ID.  
- `DELETE /classes/:id` - Delete a specific class by ID.  

### Bookings  

- `POST /bookings` - Create a new booking.  
- `GET /bookings` - Retrieve a list of all bookings.  
- `GET /bookings/:id` - Retrieve a specific booking by ID.  
- `PUT /bookings/:id` - Update a specific booking by ID.  
- `DELETE /bookings/:id` - Delete a specific booking by ID.  


---

## 🚀 Installation and Running  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/piyushpriyadarshi/abc-ignite  
   cd abc-ignite
2. Copy Env Variable:  
   ```bash
   cp .env.example .env
   `
3. Install the Dependency: 
   ```bash
   npm install
   
   `
4. Run the Project: 
   ```bash
   npm run dev
   `