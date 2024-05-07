import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import 'normalize.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <React.Fragment>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.Fragment>
  // </React.StrictMode>
);

reportWebVitals();
