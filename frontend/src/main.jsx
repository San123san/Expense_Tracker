import { StrictMode } from 'react'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import App from './App.jsx'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import Page1 from './page/Page1.jsx'
import ChartInfo from './components/ChartInfo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<App />} />
        
        <Route path="/home/signup" element={<SignUp />} />
        <Route path="/home/signin" element={<SignIn />} />
        <Route path="/home/Page1" element={<Page1 />} />
        <Route path="/home/Page1/ChartInfo" element={<ChartInfo />} />
      </Routes>
    </Router>
  </StrictMode>

);

