import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {MyProvider} from './context' 
import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyProvider>
        <App />
      </MyProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

