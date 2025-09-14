import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import CandidateHome from './pages/CandidateHome.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CompanyHome from './pages/CompanyHome.jsx'

import CompanyRoute from './components/CompanyRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
  path="/company"
  element={
    <CompanyRoute>
      <CompanyHome />
    </CompanyRoute>
  }
/>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <CandidateHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
