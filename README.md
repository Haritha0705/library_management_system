# 📚 Library Management System

A **full-stack Library Management System** built with **React (TypeScript)** for the frontend and **Node.js (TypeScript)** with **MongoDB** for the backend.

It supports **Role-Based Access Control (RBAC)** for **Members**, **Librarians**, and **Admins**, with secure authentication, book management, and file upload features via **Multer + Cloudinary**.

---

## 🚀 Tech Stack

### **Frontend**

* ⚛️ React 19 (TypeScript)
* 📦 Vite (build tool)
* 🎨 TailwindCSS (UI components & styling)
* 📡 Axios (API calls)
* 🔐 JWT Authentication (via API)
* 🛠 Admin & Librarian dashboards

### **Backend**

* 🟦 Node.js (TypeScript)
* 🚏 Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication + Bcrypt
* 📂 Multer (file handling)
* ☁️ Cloudinary (image storage)

---

## 🔑 Features

* 👤 **User Roles**: Member, Librarian, Admin
* 🔐 **Authentication**: Login & Register with JWT
* 📚 **Book Management**: Add, update, delete, borrow, return books
* 🖼 **File Uploads**: Profile pictures, book covers (Multer + Cloudinary)
* 📖 **Profile Management**: View, update, delete profile
* 🛡 **Role-Based Access Control (RBAC)**:

  * **Member** → Borrow / return books, view profile
  * **Librarian** → Manage books & members
  * **Admin** → Full system access, manage librarians & members

---

## 📂 Project Structure

### **User Frontend**

```
frontend/
│── src/
│   ├── assets/          # Static files
│   ├── components/      # Reusable UI components
│   ├── pages/           # Screens (Dashboard, Login, Profile)
│   ├── services/        # API calls (Axios)
│   ├── models/          # TypeScript models & hooks
│   ├── constants/       # Constants (auth, routes, etc.)
│   ├── context/         # Context API providers
│   └── App.tsx
│── public/
│── package.json
```

### **Admin and Librarian Frontend**

```
admin/
│── src/
│   ├── assets/          # Static files
│   ├── components/      # Reusable UI components
│   ├── pages/           # Screens (Dashboard, Login, Profile)
│   ├── services/        # API calls (Axios)
│   ├── models/          # TypeScript models & hooks
│   ├── constants/       # Constants (auth, routes, etc.)
│   ├── context/         # Context API providers
│   └── App.tsx
│── public/
│── package.json
```

### **Backend**

```
backend/
│── src/
│   ├── config/          # Env & database config
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth, role-based, multer, error handling
│   ├── services/        # Utility services (Cloudinary, JWT, etc.)
│   └── server.ts
│── uploads/             # Local uploads (Multer)
│── package.json
```

---

## ⚙️ Installation

### **1. Clone Repo**

```bash
git clone https://github.com/Haritha0705/library_management_system.git
cd library-management-system
```

### **2. Setup Backend**

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Run backend:

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

## 🌐 API Endpoints

### **Auth**

* `POST /api/v1/auth/register` → Register user
* `POST /api/v1/auth/login` → Login user

### **User Management**

* `GET /api/v1/user/:id` → Get profile
* `PUT /api/v1/user/:id` → Update profile (Multer + Cloudinary)
* `DELETE /api/v1/user/:id` → Delete profile

### **Book Management**

* `GET /api/v1/books/:bookId` → Get book by ID
* `GET /api/v1/books` → Get all books
* `GET /api/v1/books/search?title=xyz` → Search books by title
* `POST /api/v1/books/borrow/:bookId/:memberId` → Borrow book (Member only)
* `POST /api/v1/books/return/:bookId/:memberId` → Return book (Member only)
* `POST /api/v1/books` → Add book (Librarian only, with image upload)
* `PUT /api/v1/books/:id` → Update book (Librarian only, with image upload)
* `DELETE /api/v1/books/:id` → Delete book (Librarian only)
* `POST /api/v1/books/check-borrow` → Check if a book is borrowed (Member only)
* `POST /api/v1/books/borrow-history` → Borrow history (Member only)

### **Dashboard Management**

* `GET /api/v1/dashboard/librarians` → Get all librarians (Admin only)
* `POST /api/v1/dashboard/librarians` → Add librarian (Admin only, with image upload)
* `DELETE /api/v1/dashboard/librarians/:id` → Delete librarian (Admin only)
* `GET /api/v1/dashboard/members` → Get all members (Admin & Librarian)
* `GET /api/v1/dashboard/counts` → Dashboard counts (Admin & Librarian)
* `GET /api/v1/dashboard/borrowed-books` → Borrowed books list (Admin & Librarian)

---

## 🛡 Role-Based Access

* **Member** → Borrow / return books, manage profile
* **Librarian** → Manage books, manage members
* **Admin** → Full system access, manage librarians + members

---

## 📸 File Uploads

* **Multer** → Handles local image upload
* **Cloudinary** → Stores uploaded files

Flow:

1. User uploads file → Multer stores temporarily
2. Backend uploads to Cloudinary
3. Cloudinary returns secure URL → stored in MongoDB

---

## 🛠 Development

Run backend with Nodemon:

```bash
npm run dev
```

Run frontend with Vite:

```bash
npm run dev
```
