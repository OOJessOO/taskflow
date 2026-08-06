# 📋 TaskFlow

> A modern Full-Stack task management application built with **React**, **Node.js**, **Express**, and **PostgreSQL**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-Backend-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52B0E7)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Overview

TaskFlow is a full-stack web application that allows users to manage their daily tasks efficiently.

Users can:

* 🔐 Create an account and securely log in
* 📝 Create and organize task lists
* ✅ Add, edit and delete tasks
* 📅 Set due dates
* 🚩 Assign priority levels
* 🔍 Filter and search tasks
* 👤 Manage their personal profile

The project follows a clean MVC architecture on the backend and focuses on writing maintainable and scalable code.

---

## 🚀 Demo

🌐 Live Demo: **Coming Soon**

Backend API: **Coming Soon**

---

## 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/864d8101-87dd-4af4-9473-eb054633381e" />
---
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e0d5b3c3-11e2-4eaf-8164-87946ad5dfec" />

---
### Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8e855a7d-a24a-4601-80f8-ca726083c332" />



## 🛠 Tech Stack

### Frontend

* React
* React Router
* JavaScript (ES6+)
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT Authentication
* bcrypt

### Database

* PostgreSQL

---

## 📂 Project Structure

```text
TaskFlow/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── styles/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication

TaskFlow uses **JWT (JSON Web Tokens)** for authentication.

Features include:

* User registration
* Secure login
* Password hashing with bcrypt
* Protected API routes
* User session management

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/oojessoo/taskflow.git
```

Move into the project

```bash
cd taskflow
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

Start the backend

```bash
npm run dev
```

Start the frontend

```bash
npm run dev
```

---

## 📡 REST API

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Lists

```http
GET    /api/lists
POST   /api/lists
PUT    /api/lists/:id
DELETE /api/lists/:id
```

### Tasks

```http
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 🎯 Main Features

* User authentication
* Task management
* Task lists
* Priority levels
* Due dates
* Responsive interface
* RESTful API
* MVC architecture
* PostgreSQL database

---

## 📈 Future Improvements

* Drag & Drop
* Dark Mode
* Email verification
* Password reset
* Notifications
* Task sharing
* Labels & Tags
* Real-time updates

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to fork the project and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**

GitHub: https://github.com/oojessoo/

LinkedIn: https://linkedin.com/in/fenohery-razanajatovo-5b999239b/

---

⭐ If you enjoyed this project, don't forget to leave a star on GitHub!
