import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserProfile, UpdateUser } from "../../apis/users";
import { AuthContext } from "../../context/AuthContext";
import { BookContext } from "../../context/BookContext";
import { LoadingContext } from "../../context/LoadingContext";

import "../Details/Details.css";
import { LoadingSpinner } from "../Spinner/Spinner";

export const Details = () => {
  const [userData, setUserData] = useState({});
  const { books, onDelete } = useContext(BookContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { showLoading, hideLoading, isLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    showLoading();
    GetUserProfile(user.id).then((res) => {
      hideLoading();
      setUserData(res);
    });
  }, [user]);

  const bookData = books.filter((book) => book.id === id)[0];

  const ratingClass = "fas fa-star star-yellow";

  const addToFavorites = async () => {
    const currentFavoriteBooks = userData.data.favoriteBooks;

    let favoriteBooks = [];

    if (!currentFavoriteBooks) {
      favoriteBooks = [bookData];
    } else {
      favoriteBooks = [bookData, ...currentFavoriteBooks];
    }

    try {
      const result = await UpdateUser({
        ...userData.data,
        favoriteBooks,
        id: user.id,
      });

      if (result.success) {
        navigate("/favorites");
      } else {
        window.alert(result.message);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteFromFavorites = async () => {
    const currentFavoriteBooks = userData.data.favoriteBooks;

    const favoriteBooks = currentFavoriteBooks.filter((b) => b.id !== id);

    try {
      const result = await UpdateUser({
        ...userData.data,
        favoriteBooks,
        id: user.id,
      });

      if (result.success) {
        navigate("/favorites");
      } else {
        window.alert(result.message);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <section className="details-section">
      <div className="details-container">
        <header className="details-header">
          <div className="title-container">
            <h1 className="title">{bookData.title}</h1>
            <div className="author">{bookData.author}</div>
            <div className="rating">
              <i
                className={bookData.rating > 0 ? ratingClass : "fas fa-star"}
              ></i>
              <i
                className={bookData.rating > 1 ? ratingClass : "fas fa-star"}
              ></i>
              <i
                className={bookData.rating > 2 ? ratingClass : "fas fa-star"}
              ></i>
              <i
                className={bookData.rating > 3 ? ratingClass : "fas fa-star"}
              ></i>
              <i
                className={bookData.rating > 4 ? ratingClass : "fas fa-star"}
              ></i>
            </div>
          </div>
          <div className="price">{Number(bookData.price).toFixed(2)} BGN</div>
        </header>
        <main>
          <div className="img-container">
            <img src={bookData.imageUrl} alt="book" />
          </div>

          <div className="book-details">
            <div className="actions-wrapper">
              {!user.isAdmin && (
                <input
                  type="submit"
                  className="add-button"
                  value="Add to cart"
                />
              )}
              {user.isAdmin && (
                <>
                  <input
                    type="submit"
                    className="add-button"
                    value="Edit"
                    onClick={() => navigate(`/edit-book/${id}`)}
                  />
                  <input
                    onClick={() => onDelete(id)}
                    type="submit"
                    className="add-button"
                    value="Delete"
                  />
                </>
              )}
              {user.email &&
              !user.isAdmin &&
              !userData.data?.favoriteBooks.some((x) => x.id === id) ? (
                <div className="favorites-wrapper">
                  <button
                    onClick={addToFavorites}
                    type="submit"
                    className="favorites-btn"
                  >
                    <i className="far fa-heart"></i> Add to favorites
                  </button>
                </div>
              ) : (
                user.email && (
                  <div className="favorites-wrapper">
                    <button
                      onClick={deleteFromFavorites}
                      type="submit"
                      className="favorites-btn"
                    >
                      <i className="far fa-heart"></i> Delete from favorites
                    </button>
                  </div>
                )
              )}
            </div>
            <ul className="book-detail-list">
              <li className="list-item">
                <div className="title">Description</div>
                <div className="content">{bookData.description}</div>
              </li>
              <li className="list-item">
                <div className="title">Author</div>
                <div className="content">{bookData.author}</div>
              </li>
              <li className="list-item">
                <div className="title">Genre</div>
                <div className="content">{bookData.genre}</div>
              </li>
              <li className="list-item">
                <div className="title">Size</div>
                <div className="content">{bookData.size}</div>
              </li>
              <li className="list-item">
                <div className="title">N of pages</div>
                <div className="content">{bookData.pageCount}</div>
              </li>
              <li className="list-item">
                <div className="title">Year</div>
                <div className="content">{bookData.issueYear}</div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
};
