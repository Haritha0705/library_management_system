<div align="center">

# Library Management System

A modern, full-stack Library Management System featuring role-based access control, secure authentication, and cloud-based file storage.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Demo (User Portal)](https://library-management-system-eight-peach.vercel.app) · [Admin Portal](https://library-management-system-kgjl.vercel.app) · [API Documentation](https://documenter.getpostman.com/view/40267767/2sB3WpR19R)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Role-Based Access Control](#role-based-access-control)
- [File Upload Pipeline](#file-upload-pipeline)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Library Management System (LMS) is a comprehensive solution designed to streamline library operations. Built with modern web technologies, it provides separate interfaces for members, librarians, and administrators, ensuring secure and efficient management of books, users, and borrowing activities.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Role Authentication** | Secure JWT-based authentication with role-specific access levels |
| **Book Management** | Full CRUD operations for books with image upload support |
| **Borrowing System** | Track book loans, returns, and borrowing history |
| **User Management** | Profile management with avatar uploads |
| **Admin Dashboard** | Comprehensive analytics and system management tools |
| **Cloud Storage** | Seamless image uploads via Cloudinary integration |
| **Responsive Design** | Mobile-first UI built with TailwindCSS |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| TailwindCSS | Styling |
| Axios | HTTP Client |
| React Router | Navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| TypeScript | Type Safety |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Multer | File Handling |
| Cloudinary | Cloud Storage |

---

## Architecture

```
library-management-system/
├── frontend/                 # Member-facing application
│   ├── src/
│   │   ├── assets/          # Static resources
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── services/        # API integration layer
│   │   ├── models/          # TypeScript interfaces
│   │   ├── constants/       # Application constants
│   │   ├── context/         # React Context providers
│   │   └── App.tsx          # Application entry point
│   └── package.json
│
├── admin/                    # Admin & Librarian dashboard
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── models/
│   │   ├── constants/
│   │   ├── context/
│   │   └── App.tsx
│   └── package.json
│
└── backend/                  # REST API server
    ├── src/
    │   ├── config/          # Environment & database configuration
    │   ├── controllers/     # Request handlers
    │   ├── models/          # MongoDB schemas
    │   ├── routes/          # API route definitions
    │   ├── middlewares/     # Auth, RBAC, file upload middleware
    │   ├── services/        # Business logic & external services
    │   └── server.ts        # Server entry point
    ├── uploads/             # Temporary file storage
    └── package.json
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or Atlas connection)
- **Cloudinary account** (for image storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Haritha0705/library_management_system.git
   cd library-management-system
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Install admin dashboard dependencies**

   ```bash
   cd ../admin
   npm install
   ```

### Environment Variables

Create `.env` files in each directory with the following configurations:

<details>
<summary><strong>Backend (.env)</strong></summary>

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=your-secure-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

</details>

<details>
<summary><strong>Frontend (.env)</strong></summary>

```env
VITE_API_URL=http://localhost:3000
```

</details>

<details>
<summary><strong>Admin Dashboard (.env)</strong></summary>

```env
VITE_BACKEND_URL=http://localhost:3000
```

</details>

### Running the Application

Start each service in separate terminal windows:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Admin Dashboard
cd admin && npm run dev
```

---

## API Reference

Base URL: `https://library-management-system-alez.onrender.com/api/v1`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate user and receive JWT |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/user/:id` | Get user profile | Authenticated |
| `PUT` | `/user/:id` | Update user profile | Owner |
| `DELETE` | `/user/:id` | Delete user account | Owner/Admin |

### Books

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/books` | List all books | Public |
| `GET` | `/books/:bookId` | Get book details | Public |
| `GET` | `/books/search?title=` | Search books by title | Public |
| `POST` | `/books` | Add new book | Librarian |
| `PUT` | `/books/:id` | Update book | Librarian |
| `DELETE` | `/books/:id` | Delete book | Librarian |
| `POST` | `/books/borrow/:bookId/:memberId` | Borrow a book | Member |
| `POST` | `/books/return/:bookId/:memberId` | Return a book | Member |
| `POST` | `/books/check-borrow` | Check borrow status | Member |
| `POST` | `/books/borrow-history` | Get borrow history | Member |

### Dashboard

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/dashboard/counts` | Get system statistics | Admin/Librarian |
| `GET` | `/dashboard/members` | List all members | Admin/Librarian |
| `GET` | `/dashboard/librarians` | List all librarians | Admin |
| `POST` | `/dashboard/librarians` | Add new librarian | Admin |
| `DELETE` | `/dashboard/librarians/:id` | Remove librarian | Admin |
| `GET` | `/dashboard/borrowed-books` | List borrowed books | Admin/Librarian |

> 📖 **Full API Documentation**: [View on Postman](https://documenter.getpostman.com/view/40267767/2sB3WpR19R)

---

## Role-Based Access Control

The system implements three distinct user roles with specific permissions:

| Role | Permissions |
|------|-------------|
| **Member** | Browse catalog, borrow/return books, manage personal profile, view borrowing history |
| **Librarian** | All Member permissions + manage book inventory, view member records |
| **Admin** | Full system access including librarian management, system configuration, and analytics |

---

## File Upload Pipeline

The application uses a two-stage upload process for optimal performance and reliability:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Client    │────▶│    Multer    │────▶│  Cloudinary  │────▶│   MongoDB    │
│  (File Form) │     │ (Temp Store) │     │   (Cloud)    │     │  (URL Ref)   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **Client** submits file via multipart form
2. **Multer** temporarily stores file on server
3. **Cloudinary** receives and hosts the optimized image
4. **MongoDB** stores the secure CDN URL

---

## Database Schema

![Database ERD](https://i.postimg.cc/4shMnYnb/Screenshot-2025-10-03-at-10-46-42.png)

---

## Deployment

The application is deployed across multiple platforms for optimal performance:

| Service | Platform | URL |
|---------|----------|-----|
| User Portal | Vercel | [library-management-system-eight-peach.vercel.app](https://library-management-system-eight-peach.vercel.app) |
| Admin Dashboard | Vercel | [library-management-system-kgjl.vercel.app](https://library-management-system-kgjl.vercel.app) |
| Backend API | Render | [library-management-system-alez.onrender.com](https://library-management-system-alez.onrender.com) |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[⬆ Back to Top](#library-management-system)**

Made with ❤️ by [Haritha](https://github.com/Haritha0705)

</div>
