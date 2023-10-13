import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notfound from './pages/Notfound';
import Useticket from './pages/Useticket';
import Swap from './pages/Swap';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Mytickets from './pages/Mytickets';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/useticket" element={<Useticket />} />
        <Route path="/swap" element={<Swap/>} />
        <Route path="/mytickets" element={<Mytickets/>} />
        <Route path="/app" element={<Home/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
