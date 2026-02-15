import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import BookForm, { BOOK_CATEGORIES } from "../components/BookForm";
import Modal from "../components/Modal";
import "../styles/Books.css";

const CategoryBooks = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const decodedCategory = decodeURIComponent(category || "all");

  const displayName =
    decodedCategory === "all"
      ? "All Books"
      : BOOK_CATEGORIES.find(
          (c) => c.toLowerCase() === decodedCategory.toLowerCase()
        ) || decodedCategory;

  const selectedCategory =
    decodedCategory === "all"
      ? "All"
      : BOOK_CATEGORIES.find(
          (c) => c.toLowerCase() === decodedCategory.toLowerCase()
        ) || "All";

  const handleBookAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="books-page">
      <header className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate("/home")}>
            ← Back
          </button>
          <h1>{displayName}</h1>
        </div>
        <button className="add-book-btn" onClick={() => setIsModalOpen(true)}>
          + Add Book
        </button>
      </header>

      <div className="books-section card">
        <BookList refresh={refresh} selectedCategory={selectedCategory} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Book">
        <BookForm
          onBookAdded={handleBookAdded}
          onClose={() => setIsModalOpen(false)}
          defaultCategory={selectedCategory !== "All" ? selectedCategory : undefined}
        />
      </Modal>
    </div>
  );
};

export default CategoryBooks;
