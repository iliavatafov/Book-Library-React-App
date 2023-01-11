import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apis/authentication";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";
import "../Login/Login.css";
import { LoadingSpinner } from "../Spinner/Spinner";

export const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
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

    const { email, password } = inputValues;

    if (Object.values(inputValues).some((x) => x === "")) {
      window.alert("All fileds are required!");
      return;
    }

    try {
      showLoading();
      const response = await LoginUser({ email, password });
      hideLoading();
      if (response.success) {
        userLogin(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        setInputValues({
          email: "",
          password: "",
        });
      } else {
        window.alert(response.message);
        setInputValues({
          email: "",
          password: "",
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
    <section id="login-page">
      <form id="login" onSubmit={onSubmit} disabled={isLoading}>
        <div className="login-container">
          <h1>Login</h1>
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
          <input className="btn submit" type="submit" value="Login" />
          <p className="field">
            <span>
              If you don`t have profile click <Link to="/register">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};
