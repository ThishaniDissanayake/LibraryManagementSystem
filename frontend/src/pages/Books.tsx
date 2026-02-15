import { useState } from "react";
import BookList from "../components/BookList";
import BookForm, { BOOK_CATEGORIES } from "../components/BookForm";
import Modal from "../components/Modal";
import "../styles/Books.css";

const Books = () => {
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleBookAdded = () => {
    setRefresh(!refresh);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const categories = ["All", ...BOOK_CATEGORIES];

  return (
    <div className="books-page">
      <header className="page-header">
        <h1>Library Management System</h1>
        <button className="add-book-btn" onClick={handleOpenModal}>
          + Add Book
        </button>
      </header>

      <div className="category-filters card">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="books-section card">
        <h2>
          {selectedCategory === "All" ? "All Books" : selectedCategory}
        </h2>
        <BookList refresh={refresh} selectedCategory={selectedCategory} />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Book">
        <BookForm onBookAdded={handleBookAdded} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Books;
