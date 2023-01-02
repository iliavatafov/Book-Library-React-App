import { useEffect } from "react";
import { useState } from "react";
import { GetAllBooks } from "../../apis/books";
import { BookCard } from "./BookCard";

import "../Books/Books.css";

export const Books = () => {
  const [books, setBooks] = useState([]);

  console.log(books);

  const getBooks = async () => {
    try {
      const response = await GetAllBooks();

      if (response.success) {
        setBooks(response.data);
      } else {
        window.alert(response.message);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="books-container">
      {books.map((bookData) => (
        <BookCard key={bookData.id} bookData={bookData} />
      ))}
    </div>
  );
};
