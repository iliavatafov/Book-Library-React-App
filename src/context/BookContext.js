import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks } from "../apis/books";

export const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKS":
      return [...action.payload];
      break;
    case "ADD_BOOK":
      return [action.payload, ...state];
      break;
    case "EDIT_BOOK":
      return state.map((x) => (x.id === action.bookId ? action.payload : x));
      break;
    case "DELETE_BOOK":
      return state.filter((x) => x.id !== action.bookId);
      break;
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [books, dispatcher] = useReducer(bookReducer, []);
  const navigate = useNavigate();

  console.log(books);

  useEffect(() => {
    GetAllBooks().then((result) =>
      dispatcher({
        type: "ADD_BOOKS",
        payload: result.data,
      })
    );
  }, []);

  const addBook = (bookData) => {
    dispatcher({
      type: "ADD_BOOK",
      payload: bookData.data,
    });
    navigate("/books");
  };

  const bookEdit = (bookId, bookData) => {
    dispatcher({
      type: "EDIT_BOOK",
      payload: bookData,
      bookId,
    });
  };

  const onDelete = (bookId) => {
    DeleteBook(bookId);
    dispatcher({
      type: "DELETE_BOOK",
      bookId,
    });
    navigate("/books");
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        bookEdit,
        onDelete,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
