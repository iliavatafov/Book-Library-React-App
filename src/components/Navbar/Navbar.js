import { MyLinks } from "./MyLinks";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const myLinks = MyLinks.map(({ title, url }, index) => {
    return (
      <li key={index}>
        <Link to={url} className="actve">
          {title}
        </Link>
      </li>
    );
  });

  const navbarClickHandler = () => {
    setClicked(!clicked);
  };

  return (
    <nav>
      <div className="logo">
        WE <font>Love</font> BOOKS
      </div>
      <div className="nav-icon" onClick={navbarClickHandler}>
        <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-list" : "nav-list close"}>{myLinks}</ul>
    </nav>
  );
};
