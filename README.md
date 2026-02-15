# 📚 Library Management System

A modern, full-stack Library Management System built with React and ASP.NET Core. Features a clean, professional UI with complete CRUD operations, category-based navigation, user authentication, and responsive design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![.NET](https://img.shields.io/badge/.NET-9.0-purple.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)

## ✨ Features

-  **Complete CRUD Operations** - Create, Read, Update, and Delete books
-  **Category System** - 9 predefined categories with intuitive filtering
-  **User Authentication** - Secure registration and login with SHA256 password hashing
-  **Book Details** - Dedicated page for viewing complete book information
-  **Professional UI** - Clean design inspired by Notion/Linear
-  **Responsive Design** - Works seamlessly on all screen sizes
-  **RESTful API** - Well-structured backend endpoints
-  **Fast Performance** - Optimized with Vite and modern React patterns

## � Screenshots

### Login Page
![Login Page](./screenshots/login.png)
*Elegant authentication interface with library-themed background and frosted glass effect*

### Home Dashboard
![Home Page](./screenshots/home.png)
*Category-based navigation with visual cards for intuitive book browsing*


### Book Detail Page
![Book Detail](./screenshots/book-detail.png)
*Full book information display with clean, readable layout*

### Category Filter View
![Category Books](./screenshots/category-view.png)
*Filtered book listing showing only books from selected category*

## �🛠️ Tech Stack

### Frontend
- React 19 + TypeScript 5.9
- Vite 7.3 (Build Tool)
- React Router DOM
- Axios (HTTP Client)
- CSS3 with Custom Properties

### Backend
- ASP.NET Core 9.0
- Entity Framework Core 9.0
- SQLite Database
- RESTful API Architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- .NET SDK 9.0+
- Git

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd LibraryManagementSystem
```

**2. Backend Setup**
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```
Backend runs at: `http://localhost:5116`

**3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

## � Documentation

For detailed information about the development process, implementation details, challenges faced, and solutions, please refer to the [Project Report](./Library%20Management%20System.pdf).

## 🗂️ Project Structure

```
LibraryManagementSystem/
├── backend/              # ASP.NET Core API
│   ├── Controllers/      # API endpoints
│   ├── Data/            # Database context
│   ├── Models/          # Data models
│   └── Helpers/         # Utilities
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── types/       # TypeScript types
│   └── public/          # Static assets
├── SampleData.sql       # Sample book data
└── Library Management System.pdf  # Project report
```

## 🎨 Design System

**Color Palette:**
- Background: `#1A1A1A` (Dark)
- Cards: `#2A2A2A` (Medium Gray)
- Borders: `#3A3A3A` (Light Gray)
- Accent: `#007AFF` (Blue)
- Text: `#FFFFFF` (White)

**Typography:** Inter (Google Fonts)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

## 🌐 Deployment

### Backend (Railway)
- **Live URL:** `https://librarymanagementsystem-production-c055.up.railway.app`
- Automatic deployments from GitHub
- Persistent SQLite database with volume mounting
- Environment variables configured for production

### Frontend (Vercel)
- Automatic deployments from GitHub
- Global CDN distribution
- Optimized production builds

## 🔐 Security

- SHA256 password hashing
- Environment variable management
- HTTPS encryption in production
- Input validation and sanitization
- CORS configuration for API security


## 👨‍💻 Author

**Thishani Dissanayake**





