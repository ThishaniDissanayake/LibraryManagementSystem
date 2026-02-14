import { useEffect, useState } from "react";
import api from "../services/api";
import type { Book } from "../types/Book";
import "../styles/Books.css";

interface Props {
  refresh: boolean;
}

const BookList = ({ refresh }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
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
    <div className="card">
      <h2>Books</h2>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-grid">
        {books.map((b) => (
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
    </div>
  );
};

export default BookList;
