import React from 'react'
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
function Feed() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <>
          <div className={`w-full h-screen bg-customColor relative overflow-hidden ${isModalOpen ? 'blur-md' : ''}`}>
              <div className='fixed top-4 left-4 z-50 md:hidden'>
                    <button 
                        className='p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition duration-300'
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <Bars3Icon className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 w-60 h-screen bg-customColor shadow-2xl flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-60 z-40`}>
                    <div className="w-20 h-48 bg-gradient-to-l from-yellow-300/65 via-yellow-900/40 to-customColor rounded-l-full absolute right-0 top-12 opacity-60"></div>
                    <div className='relative mt-20 md:mt-40'>
                    <ul className="space-y-6">
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/home') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                            <Link to="/home" className="flex items-center w-full h-full">
                                <HomeIcon className="w-6 h-6 mr-3" /> Home
                            </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/communities') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                            <Link to="/communities" className="flex items-center w-full h-full">
                                <UsersIcon className="w-6 h-6 mr-3" /> Communities
                            </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/feed') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                            <Link to="/feed" className="flex items-center w-full h-full">
                                <UsersIcon className="w-6 h-6 mr-3" /> Feed
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
                    </ul>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default Feed
