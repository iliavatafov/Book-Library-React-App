import "../Books/BookCard.css";

export const BookCard = ({ bookData }) => {
  return (
    <article className="book-card-container">
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
          <div className="price">{bookData.price} BGN</div>
          <div className="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>
    </article>
  );
};
