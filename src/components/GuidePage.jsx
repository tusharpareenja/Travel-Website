import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, HomeIcon, UserGroupIcon, FolderIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, MapIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import {  useNavigate } from 'react-router-dom';
import { Search, MapPin, Utensils, Leaf, Users } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Logo from '../assets/Images/logo.png'



const tourTypes = [
    { name: 'City Tour', icon: <MapPin className="w-6 h-6" /> },
    { name: 'Food Courts', icon: <Utensils className="w-6 h-6" /> },
    { name: 'Nature Walk', icon: <Leaf className="w-6 h-6" /> },
  ]
  
 export const guides = [
    { name: 'John Doe', rating: 4.8, price: 50, image: '/placeholder.svg?height=100&width=100' },
    { name: 'Jane Smith', rating: 4.9, price: 55, image: '/placeholder.svg?height=100&width=100' },
    { name: 'Mike Johnson', rating: 4.7, price: 45, image: '/placeholder.svg?height=100&width=100' },
    { name: 'Emily Brown', rating: 4.9, price: 60, image: '/placeholder.svg?height=100&width=100' },
    { name: 'Alex Lee', rating: 4.6, price: 40, image: '/placeholder.svg?height=100&width=100' },
    { name: 'Sarah Wilson', rating: 4.8, price: 52, image: '/placeholder.svg?height=100&width=100' },
  ]

function GuidePage() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/travelguide'); // Navigates to the travelguide page
      };
    const [destination, setDestination] = useState('')
    const [selectedTourType, setSelectedTourType] = useState(null)
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [logOutBar, setLogoutBar] = useState(false)
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;

    return (
      <>
        <div className={`w-full h-screen bg-customColor relative overflow-hidden`}>
            <div className='fixed top-4 left-4 z-50 md:hidden'>
                <button 
                    className='p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition duration-300'
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-60 h-screen bg-customColor shadow-2xl flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-60 z-40`}>
                <div className="flex justify-center items-center mt-1">
                      <img src={Logo} alt="Logo" className="w-60 h-auto" /> {/* Adjust width/height as necessary */}
                    </div>
                    <div className="w-20 h-48 bg-gradient-to-l from-yellow-300/65 via-yellow-900/40 to-customColor rounded-l-full absolute right-0 top-40 opacity-60"></div>
                    
                    {/* Logo Section */}

                    
                    <div className='relative mt-8 md:mt-0'> {/* Adjust margin-top for the content */}
                      <ul className="space-y-1">
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/home') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/home" className="flex items-center w-full h-full">
                            <HomeIcon className="w-6 h-6 mr-3" /> Home
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/communities', '/community') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/communities" className="flex items-center w-full h-full">
                            <UserGroupIcon className="w-6 h-6 mr-3" /> Communities
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/feed') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/feed" className="flex items-center w-full h-full">
                            <FolderIcon className="w-6 h-6 mr-3" /> Feed
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/travelbuddy') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/travelbuddy" className="flex items-center w-full h-full">
                            <MapIcon className="w-6 h-6 mr-3" /> Travel Buddy
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/guide') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/guide" className="flex items-center w-full h-full">
                            <UsersIcon className="w-6 h-6 mr-3" /> Travel Guide
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/hotels') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/hotels" className="flex items-center w-full h-full">
                            <BuildingOffice2Icon className="w-6 h-6 mr-3" /> Hotels
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/about') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                          <Link to="/about" className="flex items-center w-full h-full">
                            <InformationCircleIcon className="w-6 h-6 mr-3" /> About
                          </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`} onClick={() => setLogoutBar(true)}>
                          <Link to="" className="flex items-center w-full h-full">
                            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 mr-3" /> Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

            {/* Main content area */}
            <div className='absolute w-full flex h-screen  transform -translate-x-1/2  flex-col md:ml-20 ml-48 mt-10 md:transform-none  md:top-10 overflow-y-scroll '>
            <div className="min-h-screen  bg-customColor p-2">
         <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-white">Discover Your Perfect Local Guide</h1>
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {destination && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-white">Choose Your Adventure in {destination}</h2>
            <div className="flex justify-center space-x-4">
              {tourTypes.map((type) => (
                <Button
                  key={type.name}
                  onClick={() => setSelectedTourType(type.name)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all transform hover:scale-105 ${
                    selectedTourType === type.name ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  }`}
                >
                  {type.icon}
                  <span className="mt-2">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {selectedTourType && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-blue-700">Available Guides for {selectedTourType}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Card key={guide.name} className="overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg">
                  <CardContent className="p-4">
                    <img src={guide.image} alt={guide.name} className="w-full h-40 object-cover rounded-t-lg" />
                    <h3 className="text-xl font-semibold mt-2">{guide.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{guide.rating}</span>
                    </div>
                    <p className="text-gray-600 mt-1">${guide.price}/hour</p>
                  </CardContent>
                  <CardFooter>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleButtonClick}
                    >
                    Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
            </div>
        </div>

        {logOutBar && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
                    <div className="bg-black opacity-50 fixed inset-0"></div>
                    <div className="bg-customColor1 p-8 rounded-xl shadow-lg relative z-50">
                        <h2 className="text-2xl font-bold mb-4 text-white">Are You Sure You Want To LogOut?</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setLogoutBar(false)} 
                        >
                            Yes
                        </button>
                        <button
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={() => setLogoutBar(false)} 
                        >
                            No
                        </button>
                    </div>
                </div>
)}
     </>   

    );
}

export default GuidePage;
