import { useContext } from "react";
import { BookCard } from "../Books/BookCard";

import "../Favorites/Favorites.css";
import { AuthContext } from "../../context/AuthContext";
import { GetUserProfile } from "../../apis/users";
import { useState } from "react";
import { useEffect } from "react";
import { LoadingSpinner } from "../Spinner/Spinner";
import { LoadingContext } from "../../context/LoadingContext";

export const Favorites = () => {
  const [favoriteBooksList, setFavoriteBooksList] = useState([]);
  const { user } = useContext(AuthContext);
  const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);

  useEffect(() => {
    showLoading();
    GetUserProfile(user.id).then((userData) => {
      hideLoading();
      if (userData.data.favoriteBooks) {
        setFavoriteBooksList(userData.data.favoriteBooks);
      }
    });
  }, [user]);

  const isGrid = favoriteBooksList.length > 0;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className={isGrid ? "favorites-container-grid" : "favorites-container"}
    >
      {favoriteBooksList?.length > 0 ? (
        favoriteBooksList?.map((bookData) => (
          <BookCard key={bookData.id} bookData={bookData} />
        ))
      ) : (
        <div className="no-books-wrapper">
          <div className="no-books-container">
            <h1 className="no-books">No books added</h1>
          </div>
        </div>
      )}
    </div>
  );
};
