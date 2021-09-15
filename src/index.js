import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { register } from './serviceWorkerRegistration';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// Register Service Worker
register();
