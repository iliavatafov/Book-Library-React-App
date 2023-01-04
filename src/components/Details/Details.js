import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BookContext } from "../../context/BookContext";

import "../Details/Details.css";

export const Details = () => {
  const { books, onDelete } = useContext(BookContext);

  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const bookData = books.filter((book) => book.id === id)[0];

  const ratingClass = "fas fa-star star-yellow";

  return (
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
          <div className="price">{bookData.price} BGN</div>
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
                  <input type="submit" className="add-button" value="Edit" />
                  <input
                    onClick={() => onDelete(id)}
                    type="submit"
                    className="add-button"
                    value="Delete"
                  />
                </>
              )}
              {user.email && !user.isAdmin ? (
                <div className="favorites-wrapper">
                  <button type="submit" className="favorites-btn">
                    <i className="far fa-heart"></i> Add to favorites
                  </button>
                </div>
              ) : null}
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
