import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context';
import { Auth0Provider } from "@auth0/auth0-react";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AppProvider>
//     <App />
//     </AppProvider>
//   </React.StrictMode>
// );

ReactDOM.render(
  <Auth0Provider
  domain="dev-55qaxwymxsna2ayc.us.auth0.com"
  clientId="6Gd4HbmqXyH9nlbQWvIk9kCkNiw3tfKp"
  redirectUri={window.location.origin}
>
  <AppProvider>
    <App/>
  </AppProvider>
  </Auth0Provider>
,document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
