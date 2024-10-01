import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Images/logo.png'

import { ScrollArea } from './ui/scroll-area';
import { Label } from "@/components/ui/label"
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon,FolderIcon,UserGroupIcon, ArrowLeftStartOnRectangleIcon, MapIcon  } from '@heroicons/react/24/solid';
export default function HotelBookingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false)

  const allHotels = [
    { id: 1, name: "Luxury Resort & Spa", location: "Maldives", rating: 4.8, price: 450 },
    { id: 2, name: "City Center Hotel", location: "New York", rating: 4.5, price: 250 },
    { id: 3, name: "Mountain View Lodge", location: "Swiss Alps", rating: 4.7, price: 350 },
    { id: 4, name: "Beachfront Paradise", location: "Bali", rating: 4.9, price: 400 },
    { id: 5, name: "Historic Downtown Inn", location: "Paris", rating: 4.6, price: 300 },
    { id: 6, name: "Skyline Tower Hotel", location: "Tokyo", rating: 4.7, price: 380 },
    { id: 7, name: "Tropical Island Resort", location: "Fiji", rating: 4.8, price: 420 },
    { id: 8, name: "Cozy Mountain Chalet", location: "Aspen", rating: 4.5, price: 280 },
  ]

  const [displayedHotels, setDisplayedHotels] = useState(allHotels.slice(0, 4))

  const handleSearch = () => {
    const filteredHotels = allHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    setDisplayedHotels(filteredHotels)
    setSearchPerformed(true)
  }
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
    <div className="h-screen bg-gradient-to-br bg-customColor flex">
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

      <main className='absolute w-full flex h-screen    flex-col  md:transform-none ml-0 md:ml-10 py-12 px-4 sm:px-6 lg:px-8'>
        <section className="mb-8 ">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Hotel Booking</h1>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search hotels or locations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button className = "bg-customColor2 text-black" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Hotel Name</TableHead>
                  <TableHead className="w-[20%]">Location</TableHead>
                  <TableHead className="w-[15%]">Rating</TableHead>
                  <TableHead className="w-[15%]">Price/Night</TableHead>
                  <TableHead className="w-[10%]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell>{hotel.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{hotel.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>${hotel.price}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Book</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {displayedHotels.length === 0 && searchPerformed && (
          <p className="text-center mt-4 text-gray-600">No hotels found matching your search criteria.</p>
        )}

        {!searchPerformed && (
          <p className="text-center mt-4 text-gray-600">Showing featured hotels. Use the search to find more.</p>
        )}
      </main>

     
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
  )
}