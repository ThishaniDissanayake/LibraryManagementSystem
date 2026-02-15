import { useNavigate } from "react-router-dom";
import { BOOK_CATEGORIES } from "../components/BookForm";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <div>
          <h1>Library Management System</h1>
          <p className="home-subtitle">Manage and explore your book collection</p>
        </div>
        <div className="header-actions">
          <button className="add-book-btn" onClick={() => navigate("/add-book")}>
            + Add Book
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="section-header">
        <h2 className="section-title">Categories</h2>
        <button className="view-all-btn" onClick={() => navigate("/books/all")}>
          View All Books
        </button>
      </div>

      <div className="category-grid">
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
