# 🎯 Guess The Number App

A full-stack web application where users register, log in, and play a number guessing game. Tracks best scores and displays a leaderboard.

Built using **ASP.NET Core (Clean Architecture)**, **React**, and **PostgreSQL**.

---

## 🛠 Tech Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core + PostgreSQL
- FluentValidation
- JWT Authentication
- Clean Architecture (API, Application, Core, Infrastructure)

### Frontend
- React (Vite)
- React Router
- Fetch API
- Canvas Confetti 🎉

---

## 📁 Project Structure

GuessTheNumberApp/

├── API/ # Web API project (controllers, startup)

├── Application/ # DTOs, validation, service interfaces

├── Core/ # Domain entities and repository interfaces

├── Infrastructure/ # EF Core, auth, services, DB context

├── frontend/ # React app (Vite)

├── GuessGame.sln # .NET solution file

└── README.md # This file

---

## 🚀 Features

- 🧑 User registration and login (JWT)
- 🎮 Guess the Number game (1–41)
- 💾 Tracks user's best attempt count
- 🏆 Leaderboard of top 5 scores
- 🎉 Confetti animation when guessing correctly
- 🧼 Clean Architecture + Environment-based config

---

## 🧪 Getting Started

### 📌 Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/)
- [PostgreSQL](https://www.postgresql.org/)

