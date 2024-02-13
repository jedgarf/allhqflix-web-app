import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';

import store from './App/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { init } from 'console-ban';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);

if (process.env.REACT_APP_NODE_ENV === 'PRODUCTION') {
  init({
    // write: ConsoleBanPage,
    redirect: '/off_limit',
  })
  disableReactDevTools();
  console.log = () => {}
  console.info = () => {}
  console.error = () => {}
  console.debug = () => {}
  console.clear();
}

let persistor = persistStore(store);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/ServiceWorkers/LatencyWorker.js', { scope: '/' })
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


