# 🏗️ BuildTaskPro

**BuildTaskPro** is a role-based construction site task manager built using:

- **React + Bootstrap** for the frontend
- **Node.js + Express** for the backend
- **PostgreSQL** as the database
- **Sequelize** as the ORM
- **User authentication** with role-based access (`manager`, `worker`, `admin`)

---

## 🚀 Features

- User registration and login
- Role-based access control
- Session persistence using localStorage
- Manager dashboard to view and manage tasks, workers, and equipments
- Worker dashboard to manage assigned tasks, request equipments
- Admin dashboard to Generate Report: Generate daily summary of site activities
- Secure password storage with bcrypt
- Clean, scalable full-stack structure

---

## 📁 Project Structure

```
buildtaskpro/
├── client/             # React frontend
│   ├── public/
│   ├── src/
│   └── .env
├── server/             # Node backend
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env
│   └── app.js
├── .gitignore
├── package.json        # Root-level (to run both client & server together concurrently)
├── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohit123j/buildtaskpro.git
cd buildtaskpro
```

---

### 2. Install dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

### 3. Set up environment variables

#### `server/.env`

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=enteryourpasswordhere
DB_NAME=buildtaskpro_db
```

#### `client/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

---

### 4. Set up PostgreSQL database

Create the database manually:

```sql
CREATE DATABASE buildtaskpro_db;
```

Use pgAdmin, DBeaver, or `psql` CLI.

---

### 5. Run the app

From the root directory:

```bash
npm start
```

This will:
- Start the backend server on `http://localhost:5000`
- Start the React frontend on `http://localhost:3000`

---

## 🔐 Authentication Endpoints

| Method | Endpoint              | Description         |
|--------|------------------------|---------------------|
| POST   | /api/auth/register     | Register a new user |
| POST   | /api/auth/login        | Login a user        |

---

## 📦 Task API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | /api/tasks       | Get all tasks          |
| POST   | /api/tasks       | Create a new task      |
| PUT    | /api/tasks/:id   | Update a task by ID    |
| DELETE | /api/tasks/:id   | Delete a task by ID    |

---

## 👤 User Roles

| Role     | Access Level                             |
|----------|------------------------------------------|
| Manager  | Full access to create/edit tasks         |
| Worker   | View assigned tasks (planned)            |
| Admin    | Future role for system management        |

---

## 🧾 Scripts

From the root directory:

```bash
npm start       # Run both client and server together
npm run server  # Run server only
```

---

## 🛑 .gitignore Includes

```gitignore
# === General ===
.DS_Store
Thumbs.db
.vscode/
*.env
*.log

# === Node.js ===
node_modules/
package-lock.json
npm-debug.log*

# === Client (React) ===
client/node_modules/
client/.env
client/build/

# === Server (Node) ===
server/node_modules/
server/.env
```

✅ You **should commit**:
- `package.json`
- `.env.example` (optional template)

---

## 🛣️ Roadmap

- [ ] JWT-based authentication
- [ ] Manager dashboard - Task Management, Worker Management, Equipment Management
- [ ] Worker dashboard - View Assigned Tasks, Mark Tasks as complete
- [ ] Admin dashboard - Report Generator: Generate daily summary of site activities 
- [ ] Deployment to cloud

---

## 🙌 Made by Mohit @ AppDigix

Helping modernize construction task management through powerful, simple software.
