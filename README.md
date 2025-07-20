# React + TypeScript + Vite + Node.js

Full-stack application with React frontend (TypeScript + Vite) and Node.js backend.

## 🚀 Technologies

### Frontend (Client)
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **ESLint** - Code quality checker and linter

### Backend (Server)
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web framework for Node.js

## 📋 Prerequisites

Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/)

## 🛠 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/kamiv1980/test_x_daemon.git
cd test_x_daemon
```

### 2. Install dependencies

#### Install server dependencies:
```bash
cd server
npm install
```

#### Install client dependencies:
```bash
cd ../client
npm install
```

### 3. Running the project

#### Development mode

**Start the server:**
```bash
cd server
npm node index.js
```
Server will run on `http://localhost:3001`

**Start the client (in a new terminal):**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173` (Vite default)


## 🔧 Available Scripts

### Client (React + TypeScript + Vite)
- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run preview` - preview production build
- `npm run lint` - check code with ESLint

## 🌐 API Endpoints

Main API routes:

```
GET     /logs               - "Fetch all logs",
POST    /logs               - "Create a new log",
PUT     /logs/:id           - "Update a log",
DELETE  /logs/:id           - "Delete a log"
```


## 👤 Author

**Ivan Kameniev**
- GitHub: [@kamiv1980](https://github.com/kamiv1980)
- Email: ivan.kameniev.2@gmail.com

⭐️ If this project was helpful, please give it a star!
