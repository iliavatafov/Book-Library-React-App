function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return children;
  } else {
    window.location.href = "/";
  }
}

export default ProtectedRoute;
