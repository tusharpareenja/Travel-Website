'use client'

import { useState, useEffect, useMemo } from 'react'
import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, User, DollarSign, Compass, FileText, ArrowRight, ArrowLeft } from 'lucide-react'
import Logo from '../assets/Images/logo.png'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, Bars3Icon, UserGroupIcon, MapIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import api from '@/lib/api'
import { getUser } from '@/lib/firebase'
import axios from 'axios';
import { toast } from 'sonner'

export default function CreativeTravelPartnerFinder() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [logOutBar, setLogoutBar] = useState(false);
    const [seeRequest, setRequest] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      destination: '',
      gender: [],
      budget: '',
      travelStyle: [],
      bio: ''
    })
    const [profiles, setProfiles] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const userId = getUser().id
    const [relevantProfiles, setRelevantProfiles] = useState([]);
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [userPreferences, setUserPreferences] = useState({
      travelStyle: '',
      budget: '',
      interests: [],
    });
    const [availableProfiles, setAvailableProfiles] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(pendingRequests)
    
    useEffect(() => {
      fetchProfiles();
      fetchPendingRequests();
      fetchAvailableProfiles();
      getAISuggestions(); // Add this line
    }, []);

    const fetchProfiles = async () => {
      try {
        const response = await api.get(`/buddy/${userId}`);
        if (response.data.success) {
          setProfiles(response.data.data.map(profile => ({
            ...profile,
            destination: profile.destination || '',
            gender: profile.gender || [],
            budget: profile.budget || 0,
            travelStyle: profile.travelStyle || [],
            bio: profile.bio || ''
          })));
        }
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const response = await api.get(`/buddy/requests/${userId}`);
        if (response.data.success) {
          setPendingRequests(response.data.data);
        } else {
          console.error('Failed to fetch pending requests:', response.data.error);
        }
      } catch (error) {
        console.error('Failed to fetch pending requests:', error);
      }
    };

    const fetchAvailableProfiles = async () => {
      try {
        const response = await axios.get('/api/profiles');
        setAvailableProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }
  
    const handleCheckboxChange = (name, value) => {
      setFormData(prevData => ({
        ...prevData,
        [name]: prevData[name].includes(value)
          ? prevData[name].filter(item => item !== value)
          : [...prevData[name], value]
      }))
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post('/buddy', { ...formData, userId });
        if (response.data.success) {
          console.log('Travel buddy profile created:', response.data.data);
          await fetchProfiles(); // Refresh profiles after creating a new one
          await getAISuggestions(); // Get AI suggestions based on new profile
          setStep(6);
        }
      } catch (error) {
        console.error('Failed to create travel buddy profile:', error);
      }
    }

    const sendRequest = async (receiverId) => {
      try {
        const response = await api.post(`/buddy/request/${userId}`, { receiverId });
        if (response.data.success) {
          console.log('Request sent successfully');
          toast.success('Request sent successfully');
        }
      } catch (error) {
        console.error('Failed to send request:', error);
        toast.error('Failed to send request');
      }
    };

    const handleRequestAction = async (requestId, status) => {
      try {
        const response = await api.put(`/buddy/request/${requestId}`, { status, userId });
        if (response.data.success) {
          console.log('Request updated successfully');
          fetchPendingRequests(); // Refresh pending requests after action
        }
      } catch (error) {
        console.error('Failed to update request:', error);
      }
    };
  
    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)
  
    const getAISuggestions = async () => {
      try {
        const response = await axios.post('http://localhost:8080/gemini/suggestions', {
          userPreferences: formData,
          availableProfiles: profiles
        });
        if (response.data.success && response.data.suggestions && response.data.suggestions.suggestions) {
          setAiSuggestions(response.data.suggestions.suggestions);
        } else {
          console.error('Invalid AI suggestions response:', response.data);
          setAiSuggestions([]);
        }
      } catch (error) {
        console.error('Failed to get AI suggestions:', error);
        setAiSuggestions([]);
      }
    };

    const calculateRelevanceScore = (userPreferences, profile, aiSuggestion) => {
      let score = 0;

      // Destination match (highest weight)
      if (profile.destination.toLowerCase().includes(userPreferences.destination.toLowerCase())) {
        score += 50;
      }

      // Gender preference match
      if (userPreferences.gender.includes(profile.gender)) {
        score += 20;
      }

      // Budget match (within 20% range)
      const budgetDiff = Math.abs(userPreferences.budget - profile.budget);
      if (budgetDiff <= userPreferences.budget * 0.2) {
        score += 30 - (budgetDiff / userPreferences.budget) * 30; // Higher score for closer match
      }

      // Travel style match
      const commonStyles = userPreferences.travelStyle.filter(style => 
        profile.travelStyle.includes(style)
      );
      score += commonStyles.length * 10;

      // Add AI suggestion boost
      if (aiSuggestion && aiSuggestion.score) {
        score += aiSuggestion.score * 20; // Adjust the weight as needed
      }

      return score;
    };

    const sortProfilesByRelevance = useMemo(() => {
      if (!Array.isArray(aiSuggestions) || aiSuggestions.length === 0) {
        console.warn('No AI suggestions available');
        return profiles.map(profile => ({
          ...profile,
          relevanceScore: calculateRelevanceScore(formData, profile, null),
          aiSuggestion: null
        }))
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 5);
      }
      return profiles.map(profile => {
        const aiSuggestion = aiSuggestions.find(s => s.profileId === profile.id);
        return {
          ...profile,
          relevanceScore: calculateRelevanceScore(formData, profile, aiSuggestion),
          aiSuggestion: aiSuggestion
        };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5); // Get top 5 most relevant profiles
    }, [profiles, formData, aiSuggestions]);

    useEffect(() => {
      setRelevantProfiles(sortProfilesByRelevance);
    }, [sortProfilesByRelevance]);
  
    const renderStep = () => {
      switch(step) {
        case 1:
          return (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Label htmlFor="destination" className="text-xl mb-2 flex items-center">
                <Plane className="mr-2" /> Where's your dream destination?
              </Label>
              <Input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g., Bali, Paris, New York"
                className="text-lg p-4"
                required
              />
            </motion.div>
          )
        case 2:
          return (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Label className="text-xl mb-2 flex items-center">
                <User className="mr-2" /> What's your gender? (Select all that apply)
              </Label>
              <div className="space-y-2">
                {['Male', 'Female', 'Non-binary', 'Other'].map((gender) => (
                  <div key={gender} className="flex items-center">
                    <Checkbox
                      id={`gender-${gender.toLowerCase()}`}
                      checked={formData.gender.includes(gender)}
                      onCheckedChange={() => handleCheckboxChange('gender', gender)}
                    />
                    <Label
                      htmlFor={`gender-${gender.toLowerCase()}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {gender}
                    </Label>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        case 3:
          return (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Label htmlFor="budget" className="text-xl mb-2 flex items-center">
                <DollarSign className="mr-2" /> What's your daily budget?
              </Label>
              <Input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Your daily budget in Rupees"
                className="text-lg p-4"
                required
              />
            </motion.div>
          )
        case 4:
          return (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Label className="text-xl mb-2 flex items-center">
                <Compass className="mr-2" /> What's your travel style? (Select all that apply)
              </Label>
              <div className="space-y-2">
                {['Luxury', 'Budget', 'Adventure', 'Cultural', 'Relaxation', 'Foodie'].map((style) => (
                  <div key={style} className="flex items-center">
                    <Checkbox
                      id={`style-${style.toLowerCase()}`}
                      checked={formData.travelStyle.includes(style)}
                      onCheckedChange={() => handleCheckboxChange('travelStyle', style)}
                    />
                    <Label
                      htmlFor={`style-${style.toLowerCase()}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        case 5:
          return (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Label htmlFor="bio" className="text-xl mb-2 flex items-center">
                <FileText className="mr-2" /> Tell us about yourself
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Share your interests, travel experiences, and what you're looking for in a travel partner..."
                className="text-lg p-4"
                rows={4}
                required
              />
            </motion.div>
          )
        case 6:
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">Success!</h2>
              <p className="text-xl">Your travel partner request has been submitted</p>
              <p>Here are some AI-suggested travel buddies based on your preferences:</p>
              <TooltipProvider>
                <ScrollArea className="w-full h-40 rounded-md border">
                  <div className="p-1 space-y-2">
                    {relevantProfiles.map((profile) => (
                      <Tooltip key={profile.id}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-between space-x-2 rounded-md bg-secondary p-1 cursor-pointer">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={profile.user.image} alt={profile.user.name} />
                                <AvatarFallback>{profile.user.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium truncate">{profile.user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium">Score: {profile.relevanceScore.toFixed(0)}</span>
                              {profile.aiSuggestion && (
                                <span className="text-xs font-medium text-green-500">AI Match!</span>
                              )}
                              <button onClick={() => sendRequest(profile.userId)} className="bg-green-400 rounded-xl px-2 py-1 text-xs font-medium">Send Request</button>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="w-64 p-0">
                          <div className="flex items-start space-x-3 p-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={profile.user.image} alt={profile.user.name} />
                              <AvatarFallback>{profile.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">{profile.user.name}</h4>
                              <p className="text-xs text-muted-foreground">Destination: {profile.destination}</p>
                              <p className="text-xs text-muted-foreground">Gender: {profile.gender.join(', ')}</p>
                              <p className="text-xs text-muted-foreground">Budget: ${profile.budget}</p>
                              <p className="text-xs text-muted-foreground">Style: {profile.travelStyle.join(', ')}</p>
                              <p className="text-xs text-muted-foreground">Bio: {profile.bio}</p>
                              {profile.aiSuggestion && (
                                <p className="text-xs font-medium text-green-500">AI Suggestion: {profile.aiSuggestion.reason}</p>
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </ScrollArea>
              </TooltipProvider>
              <Button onClick={() => setStep(1)} className="mt-6">Find Another Partner</Button>
            </motion.div>
          )
      }
    }

  return (
    <>
    <div className="h-screen bg-gradient-to-br bg-customColor  flex ">
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
      <div className=' absolute w-full flex h-screen    flex-col  md:transform-none  items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className="max-w-md w-full space-y-8 bg-white ml-0 md:ml-10 bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl">
      <Dialog>
        <DialogTrigger asChild>
          <button className='text-lg underline hover:scale-105 transition-all duration-300 text-center mb-4'>See Requests</button>
        </DialogTrigger>
        <DialogContent className='w-fit h-fit rounded-md border bg-white hover:cursor-pointer'>
          {/* <div className='w-96 h-96 rounded-md border bg-white hover:cursor-pointerr'> */}
            <TooltipProvider delayDuration={100}>
              {/* <div className="w-96 h-96 rounded-md border bg-white hover:cursor-pointer"> */}
                <ScrollArea className="h-full">
                  <div className="p-1 space-y-2 max-w-96">
                    <div className="text-lg font-semibold text-center mb-4">Request Pending</div>
                    {pendingRequests.map((request) => (
                      <Tooltip key={request.id}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-between space-x-12">
                            {/* Left side: Avatar and Name */}
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={request.sender.image} alt={request.sender.name} />
                                <AvatarFallback>{request.sender.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-lg font-medium truncate">{request.sender.name}</span>
                            </div>
                            
                            {/* Right side: Accept buttons */}
                            <div className="flex space-x-1"> {/* Add a flex container with space between the buttons */}
                              <button onClick={() => handleRequestAction(request.id, 'accepted')} className="bg-green-400 rounded-xl px-2 py-1 text-xs font-medium">
                                Accept
                              </button>
                              <button onClick={() => handleRequestAction(request.id, 'rejected')} className="bg-red-500 rounded-xl px-2 py-1 text-xs font-medium">
                                Reject
                              </button>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="w-64 p-0">
                          <div className="flex items-start space-x-3 p-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={request.sender.image} alt={request.sender.name} />
                              <AvatarFallback>{request.sender.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">{request.sender.name}</h4>
                              <p className="text-xs text-muted-foreground">Gender: {request.sender.gender}</p>
                              <p className="text-xs text-muted-foreground">Budget: {request.sender.budget}</p>
                              <p className="text-xs text-muted-foreground">Style: {request.sender.style}</p>
                              <p className="text-xs text-muted-foreground">Bio: {request.sender.bio}</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </ScrollArea>
              {/* </div> */}
            </TooltipProvider>
          {/* </div> */}
        </DialogContent>
      </Dialog>
          <div className='w-full flex text-center font-bold text-4xl'>Find your travel buddy</div>
        <div>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            {step < 6 ? `Step ${step} of 5` : "You're all set!"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <AnimatePresence mode='wait'>
            {renderStep()}
          </AnimatePresence>
          {step < 6 && (
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" onClick={prevStep} className="flex items-center">
                  <ArrowLeft className="mr-2" /> Back
                </Button>
              )}
              {step < 5 ? (
                <Button type="button" onClick={nextStep} className="ml-auto flex items-center">
                  Next <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto flex items-center">
                  Submit <Plane className="ml-2" />
                </Button>
              )}
            </div>
          )}
        </form>
        {step < 6 && (
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        )}
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
  )
}