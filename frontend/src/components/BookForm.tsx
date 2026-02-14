import { useState } from "react";
import api from "../services/api";
import type { Book } from "../types/Book";

interface Props {
  onBookAdded: () => void;
}

const BookForm = ({ onBookAdded }: Props) => {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

      setBook({ title: "", author: "", description: "" });
      onBookAdded();
    } catch {
      setError("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Book</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
