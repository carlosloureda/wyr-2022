import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Would You Rather app</title>
        <link rel="canonical" href="https://wouldyourather2022.com/" />
      </Helmet>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
