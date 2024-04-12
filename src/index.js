import React from 'react';
import ReactDOM from "react-dom/client";

// Routes
import AppRoutes from './AppRoutes';

// Redux toolkit
import store from './App/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Production console and devtools ban
import { init } from 'console-ban';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Vercel monitoring
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Importing all css file (Assets/css)
const importAll = (r) => {
  r.keys().forEach(r);
};
importAll(require.context('./Assets/css', false, /\.css$/));

if (process.env.NODE_ENV === 'production') {
  init({
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppRoutes/>
          <Analytics />
          <SpeedInsights />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


