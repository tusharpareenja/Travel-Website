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



                <div className='absolute w-full h-full left-1/2 transform -translate-x-1/2 flex flex-col overflow-y-scroll md:left-80 md:transform-none md:top-10'>
                
                        <div className='h-28 flex'>
                            <input 
                                className='w-32 h-10 bg-customColor1 flex relative mr-2 ml-16 mt-4 mb-6 md:ml-0 text-white placeholder-gray-400 px-3 py-2 rounded-xl focus:outline-none text-sm md:w-96 md:h-14 md:px-4 md:py-2'
                                placeholder='Search'
                            />
                            <button 
                                className='w-14 h-10 bg-customColor2 relative mt-4 text-black font-bold rounded-xl hover:bg-yellow-600 transition duration-300 text-sm md:w-28 md:h-14 md:text-base'
                            >
                                Search
                            </button>

                            {/* Notification Button */}
                            <button 
                                className='w-10 h-10 mt-4 bg-customColor1 relative rounded-full flex items-center justify-center text-white hover:bg-yellow-500 transition duration-300 text-sm md:w-14 md:h-14 md:text-base'
                                style={{ marginLeft: '40px' }}
                            >
                                <BellIcon className="w-6 h-6 md:w-8 md:h-8" />
                            </button>
                        </div>


                </div>
            </div>    
        </>
    )
}

export default Feed
