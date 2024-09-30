import React, { useEffect, useState, useCallback } from 'react';
import profile_picture from '../assets/Images/profile_picture.jpeg';
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon,FolderIcon,UserGroupIcon, MapIcon, ArrowLeftStartOnRectangleIcon  } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import ziro from '../assets/Images/ziro_valley.jpeg'
import Bali from '../assets/Images/bali_img.jpeg';
import Dubai from '../assets/Images/dubai.jpeg';
import Maldives from '../assets/Images/maldives.jpeg';
import Champawat from '../assets/Images/champawat.jpg';
import Valaparai from '../assets/Images/valaparai.jpeg';
import Logo from '../assets/Images/logo.png'
import Lonar from '../assets/Images/lonar.jpeg'
import Chitkul from '../assets/Images/chitkul.jpg'
import manali from '../assets/Images/manali.jpg';
import goa from '../assets/Images/goa.jpg'
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAxiosInstance } from '../lib/hooks';
import image1 from '../assets/Images/image1.jpeg'
import solan from '../assets/Images/solan.jpeg'
import chandratal from '../assets/Images/chandratal.jpg'
import mount_abu from '../assets/Images/mount_abu.jpeg'
import { Calendar } from "./ui/calendar.jsx";
import HotelBookings from './ui/Bookings.jsx';
import background from '../assets/images/water back.jpeg'  // Importing correctly


function Home() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('less-traffic');
    const [logOutBar, setLogoutBar] = useState(false)
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { axiosInstance, loading } = useAxiosInstance();
    const [data, setData] = useState(null);
    const [user, setUser] = useState(getUser());

    const fetchData = useCallback(async () => {
        if (loading) return;
        try {
            if (!user) {
                toast.error("Please login to continue");
                return;
            }
            console.log(user)
            
            const response = await api.post('/', {
                id: user.id
            });
            console.log(response.data);
            // Handle the response data here if needed
        } catch (error) {
            console.error('API request failed:', error);
            toast.error("Failed to fetch data");
        }
    }, [loading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderDivs = () =>{
        switch(activeCategory){
            case 'less-traffic':
                return (
                           <div className='w-full h-96  grid grid-cols-1 md:grid-cols-2  gap-1 ml-10 md:ml-0  '>
                                    <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                                       <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${Champawat})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                                        <div className='text-lg m-1 ' >Champwat
                                        <div className='flex'>
                                        <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                                        <p className='text-base text-gray-500'>India</p>
                                        </div>
                                         
                                         <p className='text-sm'>Uttarakhand</p>
                                        </div>
                                           
                                    </div>

                                    <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                                       <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${ziro})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                                        <div className='text-lg m-1 ' >Ziro Valley
                                        <div className='flex'>
                                        <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                                        <p className='text-base text-gray-500'>India</p>
                                        </div>
                                         
                                         <p className='text-sm'>Arunachal Pardesh</p>
                                        </div>
                                           
                                    </div>

                                    <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                                       <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${Valaparai})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                                        <div className='text-lg m-1 ' >Valaparai
                                        <div className='flex'>
                                        <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                                        <p className='text-base text-gray-500'>India</p>
                                        </div>
                                         
                                         <p>Gujarat</p>
                                        </div>
                                           
                                    </div>
                                    <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                                       <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${Lonar})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                                        <div className='text-lg m-1 ' >Lonar Lake
                                        <div className='flex'>
                                        <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                                        <p className='text-base text-gray-500'>India</p>
                                        </div>
                                         
                                         <p>Maharasthra</p>
                                        </div>
                                           
                                    </div>
                            </div>
                  );

                  case 'most-popular':
                    return (
                        <div className='w-full h-96  grid grid-cols-1 md:grid-cols-2  gap-1 ml-10 md:ml-0  '>
                        <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                           <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${Chitkul})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                            <div className='text-lg m-1 ' >Chitkul
                            <div className='flex'>
                            <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                            <p className='text-base text-gray-500'>India</p>
                            </div>
                             
                             <p className='text-sm'>Himachal</p>
                            </div>
                               
                        </div>

                        <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                           <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${manali})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                            <div className='text-lg m-1 ' >Manali
                            <div className='flex'>
                            <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                            <p className='text-base text-gray-500'>India</p>
                            </div>
                             
                             <p className='text-sm'>Himachal</p>
                            </div>
                               
                        </div>

                        <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                           <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${goa})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                            <div className='text-lg m-1 ' >Goa
                            <div className='flex'>
                            <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                            <p className='text-base text-gray-500'>India</p>
                            </div>
                             
                             <p>Goa</p>
                            </div>
                               
                        </div>
                        <div className='w-56 h-24 m-5 bg-customColor1 rounded-2xl flex hover:cursor-pointer   '>
                           <div className='w-20 m-2 rounded-2xl bg-black transform transition-transform duration-300 ease-in-out hover:scale-110' style={{backgroundImage: `url(${Lonar})`, backgroundSize:'cover', backgroundPosition: 'center'}}> </div>
                            <div className='text-lg m-1 ' >Lonar Lake
                            <div className='flex'>
                            <MapPinIcon className='w-4 h-7 ml-1 text-red-500' />
                            <p className='text-base text-gray-500'>India</p>
                            </div>
                             
                             <p>Maharasthra</p>
                            </div>
                               
                        </div>
                </div>
                    );
        }
    }

    return (
        <>
            <div className='w-full h-screen bg-customColor relative overflow-hidden'>
                {/* Hamburger Menu Icon */}
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

                {/* Main Content */}
                <div className='absolute w-full flex h-screen left-1/2 transform -translate-x-1/2  flex-col space-x-4 md:left-80 md:transform-none  md:top-10 overflow-y-scroll '>
                    <div className='flex flex-col h-screen overflow-y-auto'>
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

                        <div className='w-auto h-20 text-white font-semibold mt-8 md:mt-0 text-3xl ml-10 md:ml-0'>
                            Hi {user ? user.name : ''},
                        </div>

                        <div className="w-4/6 text-xl flex-col md:flex text-white font-semibold">
                            <div className="w-full h-10 mb-5 flex items-center ml-10  md:ml-0">
                                Easy Visa Destination
                            </div>

                            {/* Destination Content */}
                            <div className="md:flex ss:flex-col ml-10 md:ml-0">
                                <div className="w-60 h-64 rounded-2xl mr-4 bg-customColor1 flex flex-col justify-center mb-8 hover:cursor-pointer">
                                    <div
                                        className="w-56 h-40 bg-black m-2 rounded-2xl mb-2 transform transition-transform duration-300 ease-in-out hover:scale-105"
                                        style={{
                                        backgroundImage: `url(${Bali})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className="font-semibold ml-2 mb-6">BALI</div>
                                    <div className="w-full h-8 text-base bg-customColor2 rounded-b-2xl flex justify-center items-center font-semibold text-black">
                                        Starting from 19,600
                                    </div>
                                </div>

                                <div className="w-60 h-64 rounded-2xl mr-4 bg-customColor1 flex flex-col justify-center mb-8 hover:cursor-pointer ">
                                    <div
                                        className="w-56 h-40 bg-black m-2 rounded-2xl mb-2 transform transition-transform duration-300 ease-in-out hover:scale-105"
                                        style={{
                                        backgroundImage: `url(${Dubai})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className="font-semibold ml-2 mb-6">DUBAI</div>
                                    <div className="w-full h-8 text-base bg-customColor2 rounded-b-2xl flex justify-center items-center font-semibold text-black">
                                        Starting from 19,580
                                    </div>
                                </div>

                                <div className="w-60 h-64 rounded-2xl bg-customColor1 flex flex-col justify-center mb-8 hover:cursor-pointer ">
                                <div
                                    className="w-56 h-40 bg-black m-2 rounded-2xl mb-2 transform transition-transform duration-300 ease-in-out hover:scale-105"
                                    style={{
                                    backgroundImage: `url(${Maldives})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    }}
                                ></div>
                                    <div className="font-semibold ml-2 mb-6">MALDIVES</div>
                                    <div className="w-full h-8 text-base bg-customColor2 rounded-b-2xl flex justify-center items-center font-semibold text-black">
                                        Starting from 20,600
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-20 flex justify-between md:w-1/2 ml-10 md:ml-0 '>
                                <p className= {`cursor-pointer hover:text-white ${activeCategory === 'less-traffic' ? 'text-white' : 'text-gray-500'}`} onClick={() => setActiveCategory('less-traffic')}>Less Traffic</p>
                                <p className={`cursor-pointer hover:text-white ${activeCategory === 'most-popular' ? 'text-white' : 'text-gray-500'}`} onClick={() => setActiveCategory('most-popular')}>Most Popular</p>
                                <p className='text-gray-500 hover:cursor-pointer hover:text-white duration-300'>Budget Trip</p>
                            </div>

                            {renderDivs()}
                            <div className='w-5/6 h-120 flex mb-20 mt-44 md:mt-0 flex-col'>
                                <div className='w-full flex ml-10 md:ml-0'>SOME COOL DESTINATIONS TO VISIT IN SEPTEMBER</div>
                                <div className='w-96 md:w-full h-96   flex overflow-x-auto hide-scrollbar   flex-nowrap  mt-16 flex-shrink-0' style={{ scrollBehavior: 'smooth', overflowX: 'auto' }}>
                                    <div className='w-80 h-96 bg-customColor1 rounded-3xl cursor-pointer ml-2 mt-2 flex-col flex-shrink-0'>
                                        <div>
                                        <img src={solan} className='h-64 w-full rounded-t-xl ' />
                                        </div>
                                        <div>
                                        <p className='font-semibold text-lg mt-2 ml-2 text-white'>Solan</p>
                                        </div>
                                        <div className='flex'>
                                        
                                        <div className='mt-10 ml-2 text-white text-base bg-red-500 rounded-xl p-1'>High Traffic</div>
                                        </div>
                                    </div>
                                    <div className='w-80 h-96 bg-customColor1 cursor-pointer rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                                        <div>
                                        <img src={chandratal} className='h-64 w-full rounded-t-xl' />
                                        </div>
                                        <div>
                                        <p className='font-semibold text-lg mt-2 ml-2 text-white'>CHANDRATAL</p>
                                        </div>
                                        <div className='flex'>
                                        
                                        <div className='mt-10 bg-green-400 ml-2 text-base p-1 rounded-xl text-white'>Less Traffic</div>
                                        </div>
                                    </div>
                                    <div className='w-80 h-96 bg-customColor1 cursor-pointer rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                                        <div>
                                        <img src={mount_abu} className='h-64 w-full rounded-t-xl' />
                                        </div>
                                        <div>
                                        <p className='font-semibold text-lg mt-2 text-white'>Mount Abu</p>
                                        </div>
                                        <div className='flex'>
                                        
                                        <div className='mt-10 bg-green-400 ml-2 text-base p-1 rounded-xl text-white'>Less Traffic</div>
                                        </div>
                                    </div>
                                    <div className='w-80 h-96 bg-customColor1 rounded-xl ml-2 mt-2 flex-col flex-shrink-0'>
                                        <div>
                                        <img src={Valaparai} className='h-64 w-full rounded-t-xl' />
                                        </div>
                                        <div>
                                        <p className='font-semibold text-lg mt-2 text-white'>Valaparai</p>
                                        </div>
                                        <div className='flex'>
                                        
                                        <div className='mt-10 bg-green-400 ml-2 text-base p-1 rounded-xl text-white'>Less Traffic</div>
                                        </div>
                                    </div>
                                    
                        
                              </div>
                            </div>
                        </div>
                    </div>
                  
                </div>

                {/* Right Panel */}
                <div className='fixed hidden md:flex flex-col right-0 top-0 h-screen w-80 bg-customColor z-50 shadow-lg p-4 overflow-hidden '>
                    <div className='flex items-center mb-4 mt-7 bg-customColor1 w-44 h-16 rounded-xl'>
                        <div 
                            className='w-12 h-12 rounded-full ml-1' 
                            style={{ backgroundImage: `url(${user.image ?? profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        <div className='ml-4 text-white'>
                            <p className='text-lg font-semibold'>{user.name || ""}</p>
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className='bg-customColor1 text-white mt-0 rounded-xl shadow-md p-4'>
                        <h2 className='text-lg font-semibold mb-2 flex items-center'>
                            <CalendarIcon className="w-6 h-6 mr-2 text-gray-600" /> Calendar
                        </h2>
                        {/* Simple Calendar */}
                        <Calendar />
                        
                    </div>
                    <div>
                        <HotelBookings />
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

export default Home;