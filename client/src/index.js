import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";


// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user');

axios.defaults.baseURL = 'https://streetartwineclub-backend-production.up.railway.app';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-6ttpzvp7k3ijg0l6.us.auth0.com"
        clientId="aAnP8ywOwAijCGOi8OsIKdidjFMdoeHl"
        authorizationParams={{
          redirect_uri: "https://pf-street-art-wine-club-front-end.vercel.app/home",
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
