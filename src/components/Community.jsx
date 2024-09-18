import React from 'react'
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scene from '../assets/Images/scene.jpeg'
import { PhotoIcon } from '@heroicons/react/24/outline';
import image1 from '../assets/Images/image1.jpeg'
import comm_logo from '../assets/Images/comm_logo.jpg'
import profile_picture from '../assets/Images/profile_picture.jpeg';
import '../App.css'
function Community() {
    const [isModalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
         <div className={`w-full h-screen bg-customColor relative overflow-x-hidden overflow-y-hidden ${isModalOpen ? 'blur-md' : ''}`}>

              <div className='fixed top-4 left-4 z-50 md:hidden'>
                    <button 
                        className='p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition duration-300'
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <Bars3Icon className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Sidebar */}
              <div>
                
              </div>
                <div className={`fixed inset-y-0 left-0 w-60 min-h-screen bg-customColor shadow-2xl flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-60 z-40`}>
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
             {/* Main Div */}
             <div className='absolute w-full h-full left-1/2 transform -translate-x-1/2 flex flex-col overflow-y-scroll md:left-80 md:transform-none md:top-10'>

                <div
                    className='w-5/6 md:w-4/6 md:h-80 h-44 ml-10 flex mt-12 md:ml-0 md:mt-0 md:m-0 bg-black rounded-2xl'
                    style={{
                        backgroundImage: `url(${scene})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        flexShrink: 0
                    }}
                ></div>

                    <div className='w-5/6 md:w-4/6 h-20 md:h-24 ml-10 md:ml-0 flex mt-2 self-start rounded-2xl'>
                        <div className='w-14 h-14 md:mt-0 mt-3  md:w-24 md:h-24 rounded-full bg-white flex ml-4' style={{ backgroundImage: `url(${comm_logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div className='mt-6 md:mt-8 ml-4 md:text-2xl text-xl font-semibold text-white'>Backpackers United</div>
                        
                    </div>
                    <div className='w-5/6 md:w-4/6 h-12 md:h-12 ml-10 md:ml-0 flex mt-4 items-center justify-center self-start rounded-2xl'>
                        <input
                            className='w-1/2 h-full rounded-2xl text-gray-500 bg-customColor1 p-2'
                            placeholder='Share about your Trip'
                            
                        />
                        <label htmlFor='imageUpload' className='ml-4 cursor-pointer'>
                            <PhotoIcon className='w-8 h-8 text-white' />
                        </label>
                        <input
                            id='imageUpload'
                            type='file'
                            className='hidden'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                console.log(file);
                            }}
                        />
                    </div>

                    <div>
                        <p className='text-xl font-semibold text-white mt-2 ml-4'> Featured</p>
                    </div>
                    <div className='w-96 md:w-4/6 h-96  flex overflow-x-auto hide-scrollbar flex-nowrap  mt-2 flex-shrink-0' style={{ scrollBehavior: 'smooth', overflowX: 'auto' }}>
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                            <img src={image1} className='h-40 w-full rounded-t-xl' />
                            </div>
                            <div>
                            <p className='font-semibold text-lg mt-2 text-white'>In the hills of mabaleshwar</p>
                            </div>
                            <div className='flex'>
                            <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className='mt-6 ml-2 text-white'>Alexa Zeondor</div>
                            </div>
                        </div>
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                            <img src={image1} className='h-40 w-full rounded-t-xl' />
                            </div>
                            <div>
                            <p className='font-semibold text-lg mt-2 text-white'>In the hills of mabaleshwar</p>
                            </div>
                            <div className='flex'>
                            <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className='mt-6 ml-2 text-white'>Alexa Zeondor</div>
                            </div>
                        </div>
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                            <img src={image1} className='h-40 w-full rounded-t-xl' />
                            </div>
                            <div>
                            <p className='font-semibold text-lg mt-2 text-white'>In the hills of mabaleshwar</p>
                            </div>
                            <div className='flex'>
                            <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className='mt-6 ml-2 text-white'>Alexa Zeondor</div>
                            </div>
                        </div>
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                            <img src={image1} className='h-40 w-full rounded-t-xl' />
                            </div>
                            <div>
                            <p className='font-semibold text-lg mt-2 text-white'>In the hills of mabaleshwar</p>
                            </div>
                            <div className='flex'>
                            <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className='mt-6 ml-2 text-white'>Alexa Zeondor</div>
                            </div>
                        </div>
                        <div className='w-64 h-64 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                            <div>
                            <img src={image1} className='h-40 w-full rounded-t-xl' />
                            </div>
                            <div>
                            <p className='font-semibold text-lg mt-2 text-white'>In the hills of mabaleshwar</p>
                            </div>
                            <div className='flex'>
                            <div className='w-8 h-8 mt-5 ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className='mt-6 ml-2 text-white'>Alexa Zeondor</div>
                            </div>
                        </div>
                        
                 </div>
                 
                  <div className='w-4/6 h-screen items-center flex justify-center '>
                    <div className='w-80 md:w-130 md:h-140 mt-0 md:mt-44 ml-20 md-ml-0 rounded-2xl text-white bg-customColor1 h-96 mr-0 flex flex-shrink-0 mb-96 mt flex-col'>
                        <div className='w-72  md:w-120 md:h-120 rounded-2xl h-72 m-2 ml-3 mt-3 flex bg-black'style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }} ></div>
                        <p className='font-semibold text-lg mt-5 ml-4 text-white'>In the hills of mabaleshwar</p>
                        <div className='w-full h-32 ml-2 flex'>
                            <div className='w-12 h-12 mt-20  flex-shrink-0 b ml-1 rounded-full' style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <div className=' ml-2 mt-24   text-white'>Alexa Zeondor</div>
                        </div>
                        
                    </div>
                  </div>
                    
                 
                
                    
                    
                </div>
            </div>    
        </>
    )
}

export default Community