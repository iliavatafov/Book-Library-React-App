import { Route, Routes } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

import "./App.css";
import { Books } from "./components/Books/Books";
import { Contacts } from "./components/Contacts/Contacts";
import { Favorites } from "./components/Fsvorites/Favorites";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { Register } from "./components/Register/Register";

const PARSE_APPLICATION_ID = "sGLX4xE3o8Zw6uDw8tw36vdadkMj7PE9IP9PTkgv";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "56iJgq70U7aN2KkialB78vGLdbmBctw6hCzS2sJw";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

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
      </Routes>
    </div>
  );
}

export default App;
