import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import "../styles/Books.css";

const AddBook = () => {
  const navigate = useNavigate();

  const handleBookAdded = () => {
    navigate("/");
  };

  return (
    <div className="books-page">
      <header className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>
          <h1>Add New Book</h1>
        </div>
      </header>

      <div className="card add-book-page-form">
        <BookForm onBookAdded={handleBookAdded} onClose={() => navigate("/")} />
      </div>
    </div>
  );
};

export default AddBook;
