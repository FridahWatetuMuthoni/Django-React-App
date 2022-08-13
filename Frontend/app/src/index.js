import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './App';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

//To allow optional chaining
/*
$ npm add customize-cra react-app-rewired -D
$ npm add @babel/plugin-proposal-optional-chaining -D
 */


