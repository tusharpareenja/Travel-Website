"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Star, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon, FolderIcon,UserGroupIcon, MapIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { guides } from './GuidePage';
import Logo from '../assets/Images/logo.png';

export default function GuideBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [logOutBar, setLogoutBar] = useState(false);
  const isActive = (path) => location.pathname === path;
  const [trekRequirements, setTrekRequirements] = useState({
    trekType: '',
    groupSize: '',
    duration: '',
    difficulty: '',
    specialRequests: ''
  });
  const [guideFeedback, setGuideFeedback] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleInputChange = (e) => {
    setTrekRequirements({
      ...trekRequirements,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRequirements = (e) => {
    e.preventDefault();
    setGuideFeedback("Thank you for your interest! Based on your requirements, I recommend a 7-day Annapurna Base Camp trek. The trek difficulty matches your preference, and I can accommodate your group size. The best time for this trek would be in October. Let me know if you'd like to proceed with the booking!");
  };

  const handleBooking = () => {
    setBookingConfirmed(true);
  };

  return (
    <>
    <div className='bg-customColor flex'>
         <div className='fixed top-4 left-4 z-50 md:hidden'>
                    <button 
                        className='p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition duration-300'
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <Bars3Icon className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
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

        <div className="container mx-auto px-4 py-8 bg-customColor"> {/* Applied custom background color */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Guide Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center mt-4">John Doe</CardTitle>
            <CardDescription className="text-center">Expert Mountain Guide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>Himalayas, Nepal</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9 (120 reviews)</span>
            </div>
            <p className="mt-4 text-center">
              With over 15 years of experience, I specialize in high-altitude treks and cultural expeditions in the Himalayas.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Book Your Trek with John</CardTitle>
            <CardDescription>Tell us about your ideal trek, and John will provide personalized recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            {!guideFeedback ? (
              <form onSubmit={handleSubmitRequirements} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trekType">Preferred Trek Type</Label>
                  <select 
                    id="trekType" 
                    name="trekType" 
                    className="w-full p-2 border rounded" 
                    value={trekRequirements.trekType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Trek Type</option>
                    <option value="cultural">Cultural Trek</option>
                    <option value="highAltitude">High Altitude Trek</option>
                    <option value="scenic">Scenic Trek</option>
                    <option value="challenging">Challenging Trek</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Input 
                    id="groupSize" 
                    name="groupSize" 
                    type="number" 
                    min="1" 
                    placeholder="Number of trekkers" 
                    value={trekRequirements.groupSize}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Preferred Duration</Label>
                  <select 
                    id="duration" 
                    name="duration" 
                    className="w-full p-2 border rounded"
                    value={trekRequirements.duration}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="short">Short (3-5 days)</option>
                    <option value="medium">Medium (6-10 days)</option>
                    <option value="long">Long (11+ days)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Difficulty</Label>
                  <RadioGroup 
                    name="difficulty" 
                    value={trekRequirements.difficulty}
                    onValueChange={(value) => handleInputChange({ target: { name: 'difficulty', value } })}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easy" />
                      <Label htmlFor="easy">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="challenging" id="challenging" />
                      <Label htmlFor="challenging">Challenging</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests or Questions</Label>
                  <Textarea 
                    id="specialRequests" 
                    name="specialRequests" 
                    placeholder="Any special requirements or questions?" 
                    value={trekRequirements.specialRequests}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full">Submit Requirements</Button>
              </form>
            ) : bookingConfirmed ? (
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-green-600">Booking Confirmed!</h3>
                <p>Thank you for booking your trek with John. You will receive a confirmation email shortly with further details.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Guide's Feedback</h3>
                <p>{guideFeedback}</p>
                <div className="space-y-2">
                  <Label>Select Start Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <Button onClick={handleBooking} className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Confirm Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
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
