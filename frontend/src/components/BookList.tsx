import { useEffect, useState } from "react";
import api from "../services/api";
import type { Book } from "../types/Book";
import "../styles/Books.css";

interface Props {
  refresh: boolean;
  selectedCategory: string;
}

const BookList = ({ refresh, selectedCategory }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    if (!confirm("Delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      loadBooks();
    } catch {
      alert("Delete failed");
    }
  };

  const updateBook = async () => {
    if (!editingBook) return;

    try {
      await api.put(`/books/${editingBook.id}`, editingBook);
      setEditingBook(null);
      loadBooks();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && filteredBooks.length === 0 && (
        <p className="no-books">No books found in this category.</p>
      )}

      <div className="book-grid">
        {filteredBooks.map((b) => (
          <div key={b.id} className="card book-card">
            {editingBook?.id === b.id ? (
              <>
                <input
                  value={editingBook!.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook!, title: e.target.value })
                  }
                />

                <input
                  value={editingBook!.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook!, author: e.target.value })
                  }
                />

                <textarea
                  value={editingBook!.description}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook!,
                      description: e.target.value
                    })
                  }
                />

                <div className="book-actions">
                  <button className="primary-btn" onClick={updateBook}>
                    Save
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => setEditingBook(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="book-category-badge">{b.category || "General"}</div>
                <h3>{b.title}</h3>
                <p><b>{b.author}</b></p>
                <p>{b.description}</p>

                <div className="book-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingBook(b)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteBook(b.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BookList;
