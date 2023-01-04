import { MyLinks, MyLinksAdmin, MyLinksLoggedIn } from "./MyLinks";
import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [manuToRender, setMenuToRender] = useState([]);

  const navigate = useNavigate();

  const { user, userLogin } = useContext(AuthContext);

  useEffect(() => {
    if (user.email) {
      if (user.isAdmin) {
        setMenuToRender(MyLinksAdmin);
      } else {
        setMenuToRender(MyLinksLoggedIn);
      }
    } else {
      setMenuToRender(MyLinks);
    }
  }, [user]);

  const myLinks = manuToRender.map(({ title, url }, index) => {
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

  const logOutHandler = () => {
    localStorage.removeItem("user");
    userLogin({});
    setMenuToRender(MyLinks);
    navigate("/login");
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
                {user.email && (
                  <li onClick={logOutHandler} className="logout">
                    <Link to="/" className="actve">
                      Logout
                    </Link>
                  </li>
                )}
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
