import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import axios from "axios";
import { installDemoBackend } from "./demo/demoBackend";


// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user');

// The original backend (Railway) and its seed source were free tiers that
// expired. To keep this portfolio demo fully working (catalog, filters,
// sorting, search, product detail, cart) we serve a static catalog through a
// client-side axios adapter. The full backend code remains in the
// StreetArt_Wine_Club_BackEnd repository.
axios.defaults.baseURL = '';
installDemoBackend(axios);

const domain = "dev-6ttpzvp7k3ijg0l6.us.auth0.com"
const clientId = "aAnP8ywOwAijCGOi8OsIKdidjFMdoeHl"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
           domain={domain}
           clientId={clientId}
        authorizationParams={{
          redirect_uri: "https://street-art-wine-club-front-end-wc6e-paualarcon7.vercel.app/userprofile",
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
