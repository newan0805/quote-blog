import React, { useState } from "react";
import { auth, provider, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const docRef = collection(db, "users");

  const [regUser, setRegUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async () => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  const signInWithEP = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const signUpWithEP = async () => {
    // })
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await addDoc(docRef, {
          name: username,
          email: email,
        });
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="loginPage">
      <div className="loginForm">
        <div className="loginFields">
          <label>Email:</label>
          <input
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="loginFields">
          <label>Password:</label>
          <input
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {regUser ? (
          <>
            <div className="loginFields">
              <label>Username:</label>
              <input
                type="text"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button onClick={signUpWithEP}>Sign Up</button>
            <div className="signIN">
              <p>
                User sign in{" "}
                <span
                  onClick={() => {
                    setRegUser(false);
                  }}
                >
                  Sign In?
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <button onClick={signInWithEP}>Login</button>
            <div className="signIN">
              <p>
                New user{" "}
                <span
                  onClick={() => {
                    setRegUser(true);
                  }}
                >
                  Sign Up?
                </span>
              </p>
            </div>
          </>
        )}
      </div>
      <div className="sign-in-with-google-btn">
        <p>Sign In With Google To Continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
