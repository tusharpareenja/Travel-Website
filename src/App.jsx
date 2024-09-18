import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register'
import Home from './components/Home'
import Communities from './components/Communities'
import Feed from './components/Feed'
import Community from './components/Community'
function App() {

  return (
    <>
    <Router>
      <div className="App">
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/community" element={<Community />} />
              <Route path="/" element={<Login />} />
          </Routes>
      </div>
      
    </Router>
      
    </>
  )
}

export default App
