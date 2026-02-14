import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CategoryBooks from "./pages/CategoryBooks";
import AddBook from "./pages/AddBook";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books/:category" element={<CategoryBooks />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
