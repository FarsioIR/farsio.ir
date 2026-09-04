import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/inter";

import App from "./App";
import { installProductReleaseNotesMount } from "./product-release-mount";
import "./styles.css";
import "./product-release-notes.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

installProductReleaseNotesMount();
