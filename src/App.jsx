import './App.css'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register'
import Home from './components/Home'
import Communities from './components/Communities'
import Feed from './components/Feed'
import Community from './components/Community'
import Calendar1 from './components/Calendar'
import CreativeTravelPartnerFinder from './components/TravelBuddy'
import GuideBooking from './components/TravelGuide'
import GuidePage from './components/GuidePage'
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
              <Route path="/community/:id" element={<Community />} />
              <Route path="/calendar" element={<Calendar1 />} />
              <Route path="/travelbuddy" element={<CreativeTravelPartnerFinder />} />
              <Route path="/" element={<Login />} />
              <Route path="/travelguide" element={<GuideBooking />} />
              <Route path="/guide" element={<GuidePage />} />
          </Routes>
      </div>
      
    </Router>
      
    </>
  )
}

export default App
