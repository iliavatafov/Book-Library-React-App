import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apis/authentication";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";
import "../Register/Register.css";
import { LoadingSpinner } from "../Spinner/Spinner";

export const Register = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { showLoading, hideLoading, isLoading } = useContext(LoadingContext);

  const { userLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = inputValues;

    if (Object.values(inputValues).some((x) => x === "")) {
      window.alert("All fileds are required!");
      return;
    }

    if (password !== confirmPassword) {
      window.alert("Password don`t match!");
      return;
    }

    try {
      showLoading();
      const response = await RegisterUser({ email, password });
      hideLoading();
      if (response.success) {
        userLogin(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        setInputValues({
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        window.alert(response.message);
        setInputValues({
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      hideLoading();
      window.alert(error.message);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <section id="register-page">
      <form id="register" disabled={isLoading} onSubmit={onSubmit}>
        <div className="register-container">
          <h1>Register</h1>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="somthing@gmail.com"
              onChange={onChange}
              value={inputValues.email}
            />
          </div>
          <div className="input-container">
            <label htmlFor="register-password">Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="..."
              id="register-password"
              onChange={onChange}
              value={inputValues.password}
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="on"
              placeholder="..."
              id="confirmPassword"
              onChange={onChange}
              value={inputValues.confirmPassword}
            />
          </div>
          <input className="btn submit" type="submit" value="Register" />
          <p className="field">
            <span>
              If you already have profile click <Link to="/login">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};
