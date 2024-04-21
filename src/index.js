import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createHashRouter } from "react-router-dom"
import './index.css';
import App from './App';
import About from './About';

const router = createHashRouter([
  {
      path: "/",
      element: <App />,
  },
  {
      path: "/about",
      element: <About />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />)
