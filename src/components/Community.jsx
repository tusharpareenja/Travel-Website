import React from 'react'
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon,FolderIcon,UserGroupIcon, ArrowLeftStartOnRectangleIcon  } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MapPinIcon, MapIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scene from '../assets/Images/scene.jpeg'
import { PhotoIcon } from '@heroicons/react/24/outline';
import image1 from '../assets/Images/image1.jpeg'
import comm_logo from '../assets/Images/comm_logo.jpg'
import profile_picture from '../assets/Images/profile_picture.jpeg';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import '../App.css'
import Logo from '../assets/Images/logo.png'
import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Dialog,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from './ui/scroll-area';
import { Label } from "@/components/ui/label"

function Community() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([
        { id: 1, author: 'Alice', text: 'Great post!' },
        { id: 2, author: 'Bob', text: 'I learned a lot from this.' },
        { id: 3, author: 'Charlie', text: 'Thanks for sharing!' },
      ]);
      const [newComment, setNewComment] = useState('');
      const handleAddComment = () => {
        if (newComment.trim()) {
          setComments([...comments, { id: comments.length + 1, author: 'You', text: newComment.trim() }]);
          setNewComment('');
        }
      };
    

    const [logOutBar, setLogoutBar] = useState(false);
    const toggleLike = () => {
        setIsLiked(prev => !prev);
      };
    
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    console.log(location.pathname)
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

                <div className='w-5/6 md:w-4/6 h-20 md:h-24 ml-10 md:ml-0 flex mt-2 self-start rounded-2xl items-center justify-between'>
                    <div className='flex items-center'>
                        <div className='w-14 h-14 md:w-24 md:h-24 rounded-full bg-white flex' style={{ backgroundImage: `url(${comm_logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div className='ml-4 md:text-2xl text-xl font-semibold text-white'>Dehradun</div>
                    </div>
                    <div>
                        <button type='button' className='bg-customColor2 p-2 rounded-md hover:cursor-pointer hover:scale-105 duration-300 hover:bg-yellow-600'onClick={() => setModalOpen(true)}>Create</button>
                    </div>
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
                 
                 <div className='w-4/6 h-screen items-center flex justify-center'>
      <div className='w-80 md:w-130 md:h-140 mt-0 md:mt-14 ml-20 md:ml-0 rounded-2xl text-white bg-customColor1 h-96 mr-0 flex flex-shrink-0 mb-10 flex-col'>
        <div 
          className='w-72 md:w-120 md:h-120 rounded-2xl h-72 m-2 ml-3 mt-3 flex bg-black'
          style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <p className='font-semibold text-lg mt-5 ml-4 text-white'>In the hills of mabaleshwar</p>
        <div className='w-full h-32 ml-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <div 
              className='w-8 h-8 flex-shrink-0 rounded-full'
              style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className='ml-2 text-white'>Alexa Zeondor</div>
          </div>
          <div className='flex items-center mr-8'>
            <button className='mr-2' onClick={toggleLike}>
             <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isLiked ? [1.2, 1.7, 1.2] : 1 }}
                    transition={{ duration: 0.3 }}
                >
  
              <Heart 
                className={`${isLiked ? 'text-red-500' : 'text-white'} transition-colors duration-300`} 
                size={24} 
                fill={isLiked ? 'currentColor' : 'none'}
              />
              </motion.div>
            </button>
            <Dialog>
      <DialogTrigger asChild>
        <Button className = "bg-transparent">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            View and add comments here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col h-[300px]">
          <ScrollArea className="flex-grow">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2 p-2 bg-gray-100 rounded">
                <strong>{comment.author}:</strong> {comment.text}
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center mt-4">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow"
            />
            <Button onClick={handleAddComment} size="icon" className="ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
          </div>
        </div>
      </div>
    </div>


    <div className='w-4/6 h-screen items-center flex justify-center'>
      <div className='w-80 md:w-130 md:h-40 mt-0 md:mt-20 ml-20 md:ml-0 rounded-2xl text-white bg-customColor1 h-40 mr-0 flex flex-shrink-0 mb-10 flex-col'>
        
        <p className='font-semibold text-lg mt-5 ml-4 text-white'>In the hills of mabaleshwar</p>
        <div className='w-full h-32 ml-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <div 
              className='w-8 h-8 flex-shrink-0 rounded-full'
              style={{ backgroundImage: `url(${profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className='ml-2 text-white'>Alexa Zeondor</div>
          </div>
          <div className='flex items-center mr-8'>
            <button className='mr-2' onClick={toggleLike}>
             <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isLiked ? [1.2, 1.7, 1.2] : 1 }}
                    transition={{ duration: 0.3 }}
                >
  
              <Heart 
                className={`${isLiked ? 'text-red-500' : 'text-white'} transition-colors duration-300`} 
                size={24} 
                fill={isLiked ? 'currentColor' : 'none'}
              />
              </motion.div>
            </button>
            <Dialog>
      <DialogTrigger asChild>
        <Button className = "bg-transparent">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            View and add comments here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col h-[300px]">
          <ScrollArea className="flex-grow">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2 p-2 bg-gray-100 rounded">
                <strong>{comment.author}:</strong> {comment.text}
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center mt-4">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow"
            />
            <Button onClick={handleAddComment} size="icon" className="ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
          </div>
        </div>
      </div>
    </div>

   
   
                    
                 
                
                    
                    
                </div>

            </div>    
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
                    <div className="bg-black opacity-50 fixed inset-0"></div>
                    <div className="bg-customColor1 p-8 rounded-xl shadow-lg relative z-50">
                        <h2 className="text-2xl font-bold mb-4 text-white">Create Post</h2>

                        
                        <div className="flex flex-col items-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-16 h-16 mb-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7V6a4 4 0 014-4h10a4 4 0 014 4v1m-1 10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 13a3 3 0 100-6 3 3 0 000 6z"
                                />
                            </svg>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                        <textarea
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Share Your Experience..."
                        ></textarea>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setModalOpen(false)} 
                        >
                            Submit
                        </button>
                        <button
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={() => setModalOpen(false)} 
                        >
                            Cancel
                        </button>
                    </div>
                </div>
)}
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
    )
}

export default Community
