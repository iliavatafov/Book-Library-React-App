import { MyLinks } from "./MyLinks";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const myLinks = MyLinks.map(({ title, url }, index) => {
    return (
      <li key={index}>
        <Link to={url} className="actve">
          {title}
        </Link>
      </li>
    );
  });

  const searchClickedHandler = () => {
    setSearchClicked(!searchClicked);
  };

  const navbarClickHandler = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <Link className="logo" to="/">
          WE <font>Love</font> BOOKS
        </Link>
        <div className="links">
          {searchClicked ? (
            <div className="search-box">
              <label htmlFor="search" />
              <input
                placeholder="Type your search criteria here..."
                type="text"
                name="search"
              />
            </div>
          ) : (
            <>
              <div className="nav-icon" onClick={navbarClickHandler}>
                <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
              </div>
              <ul className={clicked ? "nav-list" : "nav-list close"}>
                {myLinks}
              </ul>
            </>
          )}
          <div className="search-cart-container">
            <i onClick={searchClickedHandler} className="fas fa-search"></i>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
