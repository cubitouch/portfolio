import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// cat watermark
console.log(
  " /\\_/\\ \n( o o )\n==_Y_== \n  `-'\n\nHi curious :3\n\nSee more about this website here:\n→ https://github.com/cubitouch/portfolio"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
