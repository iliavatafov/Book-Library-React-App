import { Route, Routes } from "react-router-dom";

import "./App.css";
import { About } from "./components/About/About";
import { Books } from "./components/Books/Books";
import { Cart } from "./components/Cart/Cart";
import { Contacts } from "./components/Contacts/Contacts";
import { Footer } from "./components/Footer/Footer";
import { Favorites } from "./components/Fsvorites/Favorites";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { Register } from "./components/Register/Register";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
