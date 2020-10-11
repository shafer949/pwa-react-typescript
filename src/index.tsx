import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

/*
All static site assets are cached so that your page loads fast on subsequent visits, 
regardless of network connectivity (such as 2G or 3G). Updates are downloaded in the background.

Your app will work regardless of network state, even if offline. 
This means your users will be able to use your app at 10,000 feet and on the subway.

… It will take care of generating a service worker file that will automatically precache all 
of your local assets and keep them up to date as you deploy updates. The service worker will 
use a cache-first strategy for handling all requests for local assets, including navigation 
requests for your HTML, ensuring that your web app is consistently fast, even on a slow or unreliable network.
*/