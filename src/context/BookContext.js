import { useContext } from "react";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks } from "../apis/books";
import { LoadingContext } from "./LoadingContext";

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

  const { showLoading, hideLoading } = useContext(LoadingContext);

  useEffect(() => {
    showLoading();
    GetAllBooks().then((result) => {
      hideLoading();
      window.localStorage.setItem("books", JSON.stringify(result.data));
      return dispatcher({
        type: "ADD_BOOKS",
        payload: result.data,
      });
    });
  }, []);

  const booksLocalStorage = JSON.parse(localStorage.getItem("books"));

  if (books.length === 0 && booksLocalStorage) {
    showLoading();
    dispatcher({
      type: "ADD_BOOKS",
      payload: JSON.parse(localStorage.getItem("books")),
    });
    hideLoading();
  }

  const addBook = (bookData) => {
    dispatcher({
      type: "ADD_BOOK",
      payload: bookData.data,
    });
    navigate("/details/" + bookData.data.id);
  };

  const bookEdit = (bookId, bookData) => {
    dispatcher({
      type: "EDIT_BOOK",
      payload: bookData,
      bookId,
    });
    navigate("/details/" + bookId);
  };

  const onDelete = (bookId) => {
    DeleteBook(bookId);
    dispatcher({
      type: "DELETE_BOOK",
      bookId,
    });
    navigate("/books/");
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
