import { useState } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import "../styles/Books.css";

const Books = () => {
  const [refresh, setRefresh] = useState(false);

  const handleBookAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="books-page">
      <h1>Library Management System</h1>
      <BookForm onBookAdded={handleBookAdded} />
      <BookList refresh={refresh} />
    </div>
  );
};

export default Books;
