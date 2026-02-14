import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryBooks from "./pages/CategoryBooks";
import AddBook from "./pages/AddBook";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:category" element={<CategoryBooks />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
