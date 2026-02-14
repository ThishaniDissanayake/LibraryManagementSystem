import { useState } from "react";
import api from "../services/api";
import type { Book } from "../types/Book";

interface Props {
  onBookAdded: () => void;
  onClose?: () => void;
  defaultCategory?: string;
}

export const BOOK_CATEGORIES = [
  "General",
  "Novel",
  "Translation",
  "Science Fiction",
  "Mystery",
  "Biography",
  "History",
  "Self-Help",
  "Technology"
];

const BookForm = ({ onBookAdded, onClose, defaultCategory }: Props) => {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    description: "",
    category: defaultCategory || "General"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      setError("Title and Author are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/books", book);

      setBook({ title: "", author: "", description: "", category: "General" });
      onBookAdded();
      if (onClose) onClose();
    } catch {
      setError("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-content">
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          required
        >
          {BOOK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Book"}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
