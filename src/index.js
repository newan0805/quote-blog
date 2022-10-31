import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div className="main">
      <App />
      <div className="footer">
          <p>All Rights Reserved By <a className="link" href="https://newan0805.netlify.app/">NK &copy;</a></p>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
