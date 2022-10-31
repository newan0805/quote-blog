import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      window.location.pathname = "/";
      window.event.preventDefault();
      localStorage.clear();
      setIsAuth(false);
    });
  };

  return (
    <Router>
      <nav>
        <Link to={"/"} className="alpha">
          Home
        </Link>
        {!isAuth ? (
          <Link to={"/login"} className="alpha">
            Login
          </Link>
        ) : (
          <>
            <Link to={"/createpost"} className="alpha">
              CreatePost
            </Link>
            <button className="logoutBtn" onClick={signUserOut}>
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} className="alpha" />} />
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} className="alpha" />}
        />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} className="alpha" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
