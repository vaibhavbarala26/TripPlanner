import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import './index.css'
import { element } from 'prop-types'
import Home from './Pages/Home.jsx'
import Create from './Pages/Create.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Trip from "./Pages/Trip.jsx"
import MyTrip from './Pages/MyTrip.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>
  },
  {
    path:"/create-trip",
    element:<Create></Create>
  },
  {
    path:"/view-trip/:id",
    element : <Trip></Trip>
  },
  {
  path:"/my-trip",
  element:<MyTrip></MyTrip>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="846041246316-g6knp3jhhmkar6t4l1bqo15g9306gt49.apps.googleusercontent.com">;
    <RouterProvider router = {router}></RouterProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
//gemini = AIzaSyCnblcQVHLM3mYwpTJgnBVP8ePENuTI9KU
