import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FormInsert from './FormInsert.jsx'
import FormEdit from './FormEdit.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/form-insert',
    element: <FormInsert />
  },
  {
    path: '/form-edit/:id',
    element: <FormEdit />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
