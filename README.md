# LibraryManagementSystem

Library Management System with C# .NET backend and React/TypeScript frontend. Supports CRUD operations on books with SQLite database integration.

## Tech Stack

**Backend:**
- .NET 9.0
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database

**Frontend:**
- React 19
- TypeScript
- Vite
- Axios

## Getting Started

### Prerequisites

- .NET 9.0 SDK
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LibraryManagementSystem
   ```

2. **Setup Backend**
   ```bash
   cd backend
   dotnet restore
   dotnet ef database update
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

#### Option 1: Run Both Servers Manually

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run
```
Backend will run on: https://localhost:7259

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

#### Option 2: Using PowerShell Script

From the root directory, run:
```powershell
# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; dotnet run"

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

### API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Project Structure

```
LibraryManagementSystem/
├── backend/
│   ├── Controllers/     # API Controllers
│   ├── Data/           # DbContext
│   ├── Models/         # Data Models
│   ├── Migrations/     # EF Migrations
│   └── Program.cs      # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React Components
│   │   ├── pages/      # Page Components
│   │   ├── services/   # API Services
│   │   ├── styles/     # CSS Styles
│   │   └── types/      # TypeScript Types
│   └── package.json
└── README.md
```

## Features

- ✅ Add new books
- ✅ View list of books
- ✅ Edit book details
- ✅ Delete books
- ✅ Responsive UI design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states

## Configuration

### Backend Port Configuration
Edit `backend/Properties/launchSettings.json` to change ports.

### Frontend API URL
Edit `frontend/src/services/api.ts` to change the backend URL.

### CORS Configuration
The backend is configured to allow requests from:
- http://localhost:5173 (default Vite dev server)
- http://localhost:5174 (alternative port)

To add more origins, edit `backend/Program.cs`.
