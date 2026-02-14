import { useNavigate } from "react-router-dom";
import { BOOK_CATEGORIES } from "../components/BookForm";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Library Management System</h1>
        <button className="add-book-btn" onClick={() => navigate("/add-book")}>
          + Add Book
        </button>
      </header>

      <p className="home-subtitle">Browse books by category</p>

      <div className="category-grid">
        <div
          className="category-card"
          onClick={() => navigate("/books/all")}
        >
          <h3>All Books</h3>
          <p>Browse the entire collection</p>
        </div>

        {BOOK_CATEGORIES.map((cat) => (
          <div
            key={cat}
            className="category-card"
            onClick={() => navigate(`/books/${encodeURIComponent(cat.toLowerCase())}`)}
          >
            <h3>{cat}</h3>
            <p>Explore {cat.toLowerCase()} books</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
