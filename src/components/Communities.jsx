import React, { useEffect } from 'react'
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon, FolderIcon,UserGroupIcon, MapIcon, ArrowLeftStartOnRectangleIcon  } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import uttarakhand from'../assets/Images/uttarakhand.jpeg'
import { Input } from './ui/input';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/hooks';
import api from '@/lib/api';
import { Eye, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { getUser } from '@/lib/firebase';
import Logo from '../assets/Images/logo.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

function Communities() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const [communityData, setCommunityData] = useState([]);
    const [myJoinedCommunites,setJoinedCommunities] = useState([])
    const [communityName, setCommunityName] = useState('');
    const [communityImage, setCommunityImage] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');

    const isActive = (path) => location.pathname === path;

    const handleCreateCommunity = async () => {
        try {
            const imageUrl = await uploadImage(communityImage);
            const tagsArray = tag.split(',').map(tag => tag.trim());
            const res = await api.post('/community/create', {
                name : communityName,
                image : imageUrl,
                description : communityDescription,
                tags : tagsArray,
                userId : getUser().id
            });
            if(res.data){
                setModalOpen(false);
                setCommunityName('');
                setCommunityImage('');
                setCommunityDescription('');
                setTags([]);
                setTag('');
                toast.success('Community created successfully!');
            } else {
                toast.error('Error creating community!');
            }
        } catch (error) {
            toast.error('Error creating community!'+ error);
            console.log(error);
        }
    };
    const handleCommunityJoin = async (id) => {
        console.log("id", id)
        try {
            const res = await api.post("/community/join" , {
                communityId : id,
                userId : getUser().id
            })
            console.log(res.data)
            if(res.data){
                toast.success('Community joined successfully!');
            } else {
                toast.error('Error joining community!');
            }
        } catch (error) {
            toast.error('Error joining community!'+ error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/community/all');
                setCommunityData(response.data.communities);
                console.log(response.data);
                const resp = await api.post('/community/my' , {
                    id : getUser().id
                });
                console.log(resp.data)
                setJoinedCommunities(resp.data.communities)
            } catch (error) {
                console.error('Error fetching community data:', error);
                toast.error('Failed to fetch communities');
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <div className="w-full h-screen bg-customColor relative overflow-hidden flex">
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

                <div className='absolute w-full h-full flex left-1/2 transform -translate-x-1/2  flex-col space-x-4 md:left-80 md:transform-none  md:top-10 overflow-y-scroll'>
                     <div className='h-fit flex'>
                        <input 
                            className='w-32 h-10 bg-customColor1 flex relative mr-2 ml-16 mt-4 mb-6 md:ml-0 text-white placeholder-gray-400 px-3 py-2 rounded-xl focus:outline-none text-sm md:w-96 md:h-14 md:px-4 md:py-2'
                            placeholder='Search Community'
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

                    <div className='w-40 h-16'>
                        <div className='w-40 h-12 flex rounded-3xl font-semibold hover:cursor-pointer hover:scale-105  duration-300 hover:bg-yellow-400 items-center justify-center  bg-customColor2 ' onClick={() => setModalOpen(true)}>Create Community</div> 
                    </div>
                    <div className='pt-10 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 max-w-[86rem] h-screen'>
                    <Tabs defaultValue="all" className="w-[80vw]">
                        <TabsList className="w-full bg-customColor1 p-1 rounded-lg">
                            <TabsTrigger 
                                value="all" 
                                className="w-1/2 py-2 text-white data-[state=active]:bg-customColor2 data-[state=active]:text-black rounded-md transition-all"
                            >
                                All communities
                            </TabsTrigger>
                            <TabsTrigger 
                                value="my" 
                                className="w-1/2 py-2 text-white data-[state=active]:bg-customColor2 data-[state=active]:text-black rounded-md transition-all"
                            >
                                My communities
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                        <div className='pt-10 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 max-w-[86rem] h-screen'>
                        {communityData.map((community) => (
                                <div className='w-full max-w-sm bg-customColor1 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105' key={community.id}>
                                <div className='p-6'>
                                    <div className='w-32 h-32 mx-auto mb-4 rounded-full transform transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer' style={{ backgroundImage: `url(${community.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <h2 className='font-bold text-white text-2xl text-center mb-4'>{community.name}</h2>
                                    <div className='flex flex-wrap justify-center gap-2 mb-4'>
                                        {community.tags.map((tag, index) => (
                                            <div key={index} className='px-3 py-1 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300'>{tag}</div>
                                        ))}
                                    </div>
                                    <p className='text-center font-medium text-gray-400 mb-4'>{community.members.length} Members</p>
                                </div>
                                <section className='flex justify-center items-center bg-customColor2'>
                                <Link 
                                    className='w-full h-12  flex justify-center items-center self-end  font-semibold text-xl hover:cursor-pointer hover:bg-yellow-400 transition-all duration-300'
                                    to={`/community/${community.id}`}
                                    >
                                    <Eye/> View
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className='w-full h-12 flex justify-center items-center self-end  font-semibold text-xl hover:cursor-pointer hover:bg-yellow-400 transition-all duration-300'><Plus/> Join</button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to join community without viewing it ?</AlertDialogTitle>
                                            <AlertDialogFooter>
                                                <AlertDialogAction onClick={()=>handleCommunityJoin(community.id)}>Join</AlertDialogAction>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogHeader>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </section>
                            </div>
                        ))}
                    </div>
                        </TabsContent>
                        <TabsContent value="my">
                        <div className='pt-10 mb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 max-w-[86rem] h-screen'>
                        {myJoinedCommunites.map((community) => (
                                <div className='w-full max-w-sm bg-customColor1 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105' key={community.id}>
                                <div className='p-6'>
                                    <div className='w-32 h-32 mx-auto mb-4 rounded-full transform transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer' style={{ backgroundImage: `url(${community.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <h2 className='font-bold text-white text-2xl text-center mb-4'>{community.name}</h2>
                                    <div className='flex flex-wrap justify-center gap-2 mb-4'>
                                        {community.tags.map((tag, index) => (
                                            <div key={index} className='px-3 py-1 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300'>{tag}</div>
                                        ))}
                                    </div>
                                    <p className='text-center font-medium text-gray-400 mb-4'>{community.members.length} Members</p>
                                </div>
                                <section className='flex justify-center items-center bg-customColor2'>
                                <Link 
                                    className='w-full h-12  flex justify-center items-center self-end  font-semibold text-xl hover:cursor-pointer hover:bg-yellow-400 transition-all duration-300'
                                    to={`/community/${community.id}`}
                                    >
                                    <Eye/> View
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className='w-full h-12 flex justify-center items-center self-end  font-semibold text-xl hover:cursor-pointer hover:bg-yellow-400 transition-all duration-300'><Plus/> Join</button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to join community without viewing it ?</AlertDialogTitle>
                                            <AlertDialogFooter>
                                                <AlertDialogAction onClick={()=>handleCommunityJoin(community.id)}>Join</AlertDialogAction>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogHeader>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </section>
                            </div>
                        ))}
                    </div>
                        </TabsContent>
                    </Tabs>
                    </div>
                </div>
        </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black opacity-50 fixed inset-0"></div>
                <div className="bg-customColor1 p-8 rounded-xl shadow-lg relative z-50">
                    <h2 className="text-2xl font-bold mb-4 text-white">Create Community</h2>
                    <input className="w-full p-2 border rounded mb-4" placeholder="Community Name" onChange={(e) => setCommunityName(e.target.value)} />
                    <input className="w-full p-2 border rounded mb-4" placeholder="Community Image" type="file" onChange={(e) => setCommunityImage(e.target.files[0])} />
                    <textarea className="w-full p-2 border rounded mb-4" placeholder="Community Description" onChange={(e) => setCommunityDescription(e.target.value)}></textarea>
                    <input className="w-full p-2 border rounded mb-4" placeholder="Community Tags" onChange={(e) => setTag(e.target.value)} />
                    <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleCreateCommunity} // Close the modal
                    >
                    Submit
                    </button>
                    <button
                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setModalOpen(false)} // Close the modal
                    >
                    Cancel
                    </button>
                </div>
                </div>
            )}
        </>
    )
}

export default Communities;