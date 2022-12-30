import { Route, Routes } from "react-router-dom";

import "./App.css";
import { About } from "./components/About/About";
import { AddBook } from "./components/AddBook/AddBook";
import { Books } from "./components/Books/Books";
import { Cart } from "./components/Cart/Cart";
import { Contacts } from "./components/Contacts/Contacts";
import { Favorites } from "./components/Favorites/Favorites";
import { Footer } from "./components/Footer/Footer";

import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Register } from "./components/Register/Register";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
