import React from "react";
import ReactDOM from "react-dom";
import "./Layout/Style.css";
import App from "./Layout/App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/configureStore";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
