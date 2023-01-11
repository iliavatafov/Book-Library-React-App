import { useNavigate } from "react-router-dom";
import "../Books/BookCard.css";

export const BookCard = ({ bookData }) => {
  const navigate = useNavigate();

  const ratingClass = "fas fa-star star-yellow";

  return (
    <article
      onClick={() => navigate(`/details/${bookData.id}`)}
      className="book-card-container"
    >
      <div className="img-container">
        <img src={bookData.imageUrl} alt="book" />
      </div>
      <div className="content">
        <h2 className="title">{bookData.title}</h2>
        <p className="author">Author: {bookData.author}</p>
        <p className="genre">
          Genre: <span>{bookData.genre}</span>
        </p>
        <hr />
        <div className="price-rating-container">
          <div className="price">{Number(bookData.price).toFixed(2)} BGN</div>
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
      </div>
    </article>
  );
};
