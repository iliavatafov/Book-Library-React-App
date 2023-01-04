import { BookCard } from "./BookCard";

import "../Books/Books.css";
import { useContext } from "react";
import { BookContext } from "../../context/BookContext";

export const Books = () => {
  const { books } = useContext(BookContext);

  return (
    <div className="books-container">
      {books.map((bookData) => (
        <BookCard key={bookData.id} bookData={bookData} />
      ))}
    </div>
  );
};
