# 📚 Library Management System

A **full-stack Library Management System** built with **React (TypeScript)** for the frontend and **Node.js (TypeScript)** with **MongoDB** for the backend.
It supports **role-based access control (RBAC)** for members, librarians, and admins.

Includes features like **file upload with Multer** and **cloud storage via Cloudinary**.

---

## 🚀 Tech Stack

### **Frontend**

* ⚛️ React 18 (TypeScript)
* 📦 Vite / CRA (build tool)
* 🎨 TailwindCSS / MUI (styling)
* 🔐 JWT Authentication (via API)
* 📡 Axios for API calls
* 🛠 Admin panel (React + TS)

### **Backend**

* 🟦 Node.js (TypeScript)
* 🚏 Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication + Bcrypt
* 📂 Multer (local file handling)
* ☁️ Cloudinary (image uploads)

---

## 🔑 Features

* 👤 **User Roles**: Member, Librarian, Admin
* 🔐 **Authentication**: Login / Register with JWT
* 📚 **Profile Management**: Update, delete, view profiles
* 🖼 **File Upload**: Profile images, book covers via Multer + Cloudinary
* 📖 **Book Management**: Add, update, delete, borrow, and return books
* 🛡 **Role-based Access Control** (RBAC):

  * **Member** → Borrow / return books, view profile
  * **Librarian** → Manage books, manage members
  * **Admin** → Full system access, manage librarians and members

---

## 📂 Project Structure

### **Frontend**

```
frontend/
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Screens (Dashboard, Login, Profile)
│   ├── services/       # API calls (Axios)
│   ├── hooks/          # Custom hooks
│   ├── context/        # Auth context
│   ├── types/          # TypeScript interfaces
│   └── App.tsx
│── public/
│── package.json
```

### **Backend**

```
backend/
│── src/
│   ├── controllers/    # Business logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middlewares/    # Auth, role, multer, error handling
│   ├── utils/          # Helpers (Cloudinary, JWT, etc.)
│   └── server.ts
│── uploads/            # Local uploads (Multer)
│── package.json
```

---

## ⚙️ Installation

### **1. Clone Repo**

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

### **2. Setup Backend**

```bash
cd backend
npm install
```

* Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

* Run backend:

```bash
npm run dev
```

### **3. Setup Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints (Backend)

### **Auth**

* `POST /api/v1/auth/register` – Register user
* `POST /api/v1/auth/login` – Login user

### **User Management**

* `GET /api/v1/user/get-profile/:id` – Get profile
* `PUT /api/v1/user/update-profile/:id` – Update profile (Multer + Cloudinary)
* `DELETE /api/v1/user/delete-profile/:id` – Delete profile

### **Book Management (Librarian/Admin only)**

* `POST /api/v1/books` – Add book
* `PUT /api/v1/books/:id` – Update book
* `DELETE /api/v1/books/:id` – Delete book
* `GET /api/v1/books` – List books

---

## 🛡 Role-Based Access

* **Member**: Borrow/return books, manage own profile
* **Librarian**: Manage books + members
* **Admin**: Full control over system

---

## 📸 File Uploads

* **Multer** handles local image upload
* **Cloudinary** stores and serves uploaded files

Example flow:

1. User uploads file → Multer saves temporarily
2. Backend uploads to Cloudinary
3. Cloudinary returns secure URL → stored in MongoDB

---

## 🛠 Development

### Run with Nodemon (backend)

```bash
npm run dev
```

### Run with Vite (frontend)

```bash
npm run dev
```

🔥 That’s a **professional README.md** you can drop straight into your repo.

👉 Do you also want me to add a **sequence diagram / architecture diagram (in Markdown + Mermaid)** to make the README look even more professional?
