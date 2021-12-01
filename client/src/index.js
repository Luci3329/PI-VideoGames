import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store/index'; // sin llaves xq lo exporté default

// Provider store -> todos los componentes envueltos PUEDEN ACCEDER AL STORE (si se suscriben)
// <BrowserRouter> ?? luego del Provider (encierra a <App/>)

ReactDOM.render(
  <Provider store = { store }>

  <React.StrictMode>
    <App />
  </React.StrictMode>,

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
