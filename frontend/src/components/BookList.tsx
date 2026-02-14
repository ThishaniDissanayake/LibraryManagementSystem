import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Book } from "../types/Book";
import { BOOK_CATEGORIES } from "./BookForm";
import Modal from "./Modal";
import "../styles/Books.css";

interface Props {
  refresh: boolean;
  selectedCategory: string;
}

const BookList = ({ refresh, selectedCategory }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const DESC_LIMIT = 200;

  const loadBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get<Book[]>("/books");
      setBooks(res.data);
    } catch {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [refresh]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(b => b.category === selectedCategory));
    }
  }, [books, selectedCategory]);

  const deleteBook = async (id?: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      loadBooks();
    } catch {
      alert("Delete failed");
    }
  };

  const openEditModal = (book: Book) => {
    setEditingBook({ ...book });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingBook(null);
    setIsEditModalOpen(false);
  };

  const updateBook = async () => {
    if (!editingBook) return;

    try {
      await api.put(`/books/${editingBook.id}`, editingBook);
      closeEditModal();
      loadBooks();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <>
      {loading && <p className="loading">Loading books...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && filteredBooks.length === 0 && (
        <div className="no-books">
          <p>No books found in this category.</p>
        </div>
      )}

      <div className="book-grid">
        {filteredBooks.map((b) => (
          <div key={b.id} className="book-card">
            <div className="book-card-header">
              <span className="book-category-badge">{b.category || "General"}</span>
            </div>
            <h3 className="book-title">{b.title}</h3>
            <p className="book-author">by {b.author}</p>
            {b.description && (
              <p className="book-description">
                {b.description.length > DESC_LIMIT && !expandedIds.has(b.id!)
                  ? <>{b.description.slice(0, DESC_LIMIT)}... <button className="see-more-btn" onClick={() => setExpandedIds(prev => new Set(prev).add(b.id!))}>see more</button></>
                  : b.description
                }
              </p>
            )}
            <div className="book-actions">
              <button className="btn-view" onClick={() => navigate(`/book/${b.id}`)}>
                View
              </button>
              <button className="btn-edit" onClick={() => openEditModal(b)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => deleteBook(b.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Book">
        {editingBook && (
          <div className="book-form-content">
            <form onSubmit={(e) => { e.preventDefault(); updateBook(); }}>
              <div className="form-group">
                <label>Title</label>
                <input
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Author</label>
                <input
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={editingBook.category || "General"}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, category: e.target.value })
                  }
                >
                  {BOOK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editingBook.description}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, description: e.target.value })
                  }
                />
              </div>

              <div className="form-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeEditModal} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookList;
