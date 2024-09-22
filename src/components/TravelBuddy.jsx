'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, User, DollarSign, Compass, FileText, ArrowRight, ArrowLeft } from 'lucide-react'

import { Link, useNavigate,  useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, BuildingOffice2Icon, InformationCircleIcon, BellIcon, Bars3Icon, FolderIcon,UserGroupIcon, MapIcon } from '@heroicons/react/24/solid';

export default function CreativeTravelPartnerFinder() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const isActive = (path) => location.pathname === path;
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      destination: '',
      gender: [],
      budget: '',
      travelStyle: [],
      bio: ''
    })
  
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
  
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Form submitted:', formData)
      setFormData({
        destination: '',
        gender: [],
        budget: '',
        travelStyle: [],
        bio: ''
      })
      setStep(6)
    }
  
    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)
  
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
              <p className="text-xl">Your travel partner request has been submitted. Get ready for an amazing adventure!</p>
              <Button onClick={() => setStep(1)} className="mt-6">Find Another Partner</Button>
            </motion.div>
          )
      }
    }

  return (
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
                    <div className="w-20 h-48 bg-gradient-to-l from-yellow-300/65 via-yellow-900/40 to-customColor rounded-l-full absolute right-0 top-12 opacity-60"></div>
                    <div className='relative mt-20 md:mt-32'>
                    <ul className="space-y-6">
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
                                <UsersIcon className="w-6 h-6 mr-3" /> Travel Buddy
                            </Link>
                        </li>
                        <li className={`text-xl font-semibold flex items-center px-6 py-4 rounded-lg shadow-md transition duration-300 cursor-pointer ${isActive('/guide') ? 'bg-gray-800 text-yellow-300' : 'text-white hover:bg-gray-800 hover:text-yellow-300'}`}>
                            <Link to="/guide" className="flex items-center w-full h-full">
                                <MapIcon className="w-6 h-6 mr-3" /> Travel Guide
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
      <div className=' absolute w-full flex h-screen    flex-col  md:transform-none  items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className="max-w-md w-full space-y-8 bg-white ml-0 md:ml-10 bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Find Your Perfect Travel Partner</h2>
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
  )
}