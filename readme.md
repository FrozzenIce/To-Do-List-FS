# To-Do List — Full Stack

A full-stack To-Do List web application built to practice and demonstrate backend development, REST APIs, authentication, database management, middleware, validation, and automated testing.

> 🚧 **Project Status:** Backend development and testing are complete. Frontend development is the next major stage.

---

## 📌 Overview

This project is a full-stack To-Do List application designed around a RESTful backend and a planned modern web frontend.

The project started with the backend and focuses on building a properly structured API rather than keeping the application as a simple frontend-only task manager.

The backend handles authentication, user management, task management, authorization, validation, middleware, and database operations.

A frontend will be added as the next major phase of development.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration
* User login
* Authentication middleware
* Protected routes
* User-specific access control
* Password handling
* Authentication validation

### 👤 User Management

* Create user accounts
* Retrieve user information
* Update user information
* Delete users
* Protected user operations

### ✅ Task Management

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* User-specific tasks
* Protected task operations
* Task validation

### 🛡️ Middleware & Validation

* Authentication middleware
* Task-related middleware
* Request validation
* Authorization checks
* Centralized handling of backend requests

### 🧪 Testing

The backend has been tested across its implemented functionality, including authentication, user operations, task operations, middleware, validation, and error-handling scenarios.

---

## 🏗️ Project Structure

```text
To-Do-List-FS/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── ...
│   │
│   └── ...
│
├── .gitignore
├── readme.md
└── ...
```

> The structure may change as the project moves into frontend development.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript
* REST API
* Middleware-based architecture
* Database integration

### Frontend

**Planned**

* React

### Development & Testing

* Git
* GitHub
* API testing
* Automated backend tests

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your system:

* [Node.js](https://nodejs.org/)
* npm
* Git
* A database supported by the backend configuration

---

### 1. Clone the Repository

```bash
git clone https://github.com/FrozzenIce/To-Do-List-FS.git
```

```bash
cd To-Do-List-FS
```

---

### 2. Navigate to the Backend

```bash
cd backend
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory and configure the required environment variables.

Example:

```env
PORT=5000

HOST=your_host
DBUSER=username
DBPASSWORD=database_password
DATABASE=your_db_name

JWT_SECRET=your_secret_key
```

> Use the environment variables required by the current backend configuration. Never commit real credentials, API keys, database passwords, or JWT secrets to GitHub.

---

### 5. Start the Backend

For development:

```bash
npm run dev
```

Or, if the project uses the standard Node start command:

```bash
npm start
```

The API should then be available at the configured local port.

---

## 🔌 API

The backend provides REST API endpoints for authentication, users, and tasks.

The API is structured around protected and public routes, with authentication middleware used where authorization is required.

### Main API Areas

| Area           | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| Authentication | Registration and login                               |
| Users          | User account management                              |
| Tasks          | Creating and managing tasks                          |
| Middleware     | Authentication, authorization and request processing |

Detailed API documentation can be added as the project continues to develop.

---

## 🗺️ Roadmap

### 🚧 Yet to Implement

* [ ] Frontend

  * [ ] React-based frontend
  * [ ] Connect frontend to the existing backend API
  * [ ] Authentication interface
  * [ ] User management interface
  * [ ] Task management interface

### 💡 Possible Future Features

These features are being considered but are **not currently fixed plans**:

* [ ] Application themes
* [ ] Dark/light/custom themes
* [ ] Email-based password recovery
* [ ] Password reset through email
* [ ] Email confirmation / verification
* [ ] Additional account and authentication features

> The roadmap is subject to change as the project develops.

---

## 📈 Development Status

| Component               | Status        |
| ----------------------- | ------------- |
| Backend                 | ✅ Complete    |
| Authentication          | ✅ Implemented |
| User Management         | ✅ Implemented |
| Task Management         | ✅ Implemented |
| Middleware              | ✅ Implemented |
| Backend Testing         | ✅ Complete    |
| Frontend                | 🚧 Planned    |
| React Integration       | 🚧 Planned    |
| Themes                  | 💡 Possible   |
| Email Password Recovery | 💡 Possible   |
| Email Confirmation      | 💡 Possible   |

---

## 🎯 Project Goals

The main goals of this project are to:

* Build a complete full-stack application
* Gain practical experience with backend development
* Understand REST API design
* Work with authentication and authorization
* Practice middleware and request validation
* Work with databases
* Write and run backend tests
* Connect a frontend application to a REST API
* Improve understanding of real-world project structure

---

## 🔄 Development Approach

The project is being developed in stages:

```text
Backend
   ↓
API & Authentication
   ↓
Testing
   ↓
Frontend
   ↓
Full-Stack Integration
   ↓
Optional Features
```

The backend is intentionally developed and tested before moving on to the frontend.

---

## 📚 What I Learned

This project has provided practical experience with:

* Backend application architecture
* Express.js
* REST APIs
* Authentication
* Authorization
* Middleware
* Database operations
* API validation
* Error handling
* Automated testing
* Git and GitHub workflow
* Structuring a larger JavaScript project

---

## 👨‍💻 Author

**FrozzenIce**

GitHub: [@FrozzenIce](https://github.com/FrozzenIce)

---

## 📄 License

This project does not currently specify a license.

If a license is added later, this section will be updated accordingly.
