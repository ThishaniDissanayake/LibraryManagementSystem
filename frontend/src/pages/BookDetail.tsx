import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Book } from "../types/Book";
import "../styles/Books.css";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await api.get<Book>(`/books/${id}`);
        setBook(res.data);
      } catch {
        setError("Book not found");
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  if (loading) return <div className="books-page"><p className="loading">Loading...</p></div>;
  if (error || !book) return (
    <div className="books-page">
      <p className="error">{error || "Book not found"}</p>
      <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  );

  return (
    <div className="books-page">
      <header className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>{book.title}</h1>
        </div>
      </header>

      <div className="book-detail card">
        <span className="book-category-badge">{book.category || "General"}</span>
        <h2 className="book-detail-title">{book.title}</h2>
        <p className="book-detail-author">by {book.author}</p>
        {book.description && (
          <div className="book-detail-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
