import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Parallax } from 'react-parallax';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, useAnimation } from 'framer-motion';
import { Camera, Hotel, Mountain, Sun, Umbrella, MessageCircle, Send } from 'lucide-react'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NainitalPage = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. How can I assist you with your Nainital trip today?", sender: 'ai' }]);
      }, 1000);
      setInput('');
    }
    };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const hotelData = {
    labels: ['Luxury', 'Mid-range', 'Budget'],
    datasets: [
      {
        label: 'Booked Rooms',
        data: [80, 65, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Hotel Categories',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Number of Booked Rooms',
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Hotel Room Bookings in Nainital',
      },
    },
  };

  return (
    <div className="min-h-screen bg-customColor text-white">
      {/* Message Circle Icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-10 h-10 text-white" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat with Nainital AI Guide</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
          <DialogFooter>
            <div className="flex w-full">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} className="ml-2">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://tse1.mm.bing.net/th/id/OIP.Hu5A9Cuz8CbQSQ3IdGYtbwHaEK?rs=1&pid=ImgDetMain')" }}
      >
        <div className="absolute inset-0 bg-customColor opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl font-bold mb-4 text-shadow-lg">Discover Nainital</h1>
          <p className="text-2xl text-shadow">Your Gateway to Himalayan Adventures!</p>
        </motion.div>
      </div>

      <section className="py-20 px-8 text-white" ref={ref}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className='text-4xl font-bold mb-8 text-center'>About Nainital</h1>
          <div className='mb-10'>
            <h3>
            Nainital is a picturesque hill station located in the Kumaon region of Uttarakhand, India. It is famous for its scenic Naini Lake, surrounded by mountains, and offers stunning views of nature. Nainital is known for its pleasant climate, colonial architecture, and popular tourist spots like Naina Devi Temple, Tiffin Top, and the Snow View Point. The town is a favorite destination for boating, trekking, and exploring the surrounding forests. It's a peaceful retreat for nature lovers and adventure seekers alike.
            </h3>
          </div>
          <h2 className="text-4xl font-bold mb-8 text-center">Thrilling Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            {[
              { icon: Umbrella, title: "Boating on Naini Lake", image: "https://tse2.mm.bing.net/th/id/OIP.3ybJ72uaLRpPPWot-mQR2gHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain" },
              { icon: Mountain, title: "Trekking to Naina Peak", image: "https://tse3.mm.bing.net/th/id/OIP.tZBEDepo1wcBsB5qramLlgHaFj?rs=1&pid=ImgDetMain" },
              { icon: Camera, title: "Cable Car Ride", image: "https://d3r8gwkgo0io6y.cloudfront.net/upload/NF/Cable-Car-Ride.jpg" },
            ].map((activity, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg overflow-hidden text-white">
                <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <activity.icon className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-semibold">{activity.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      <Parallax bgImage="/placeholder.svg?height=1080&width=1920" strength={300}>
        <section className="py-20 px-8 backdrop-blur-sm bg-customColor text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Hotel Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={hotelData} options={chartOptions} />
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </Parallax>

      <section className="py-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Card className="bg-customColor1 backdrop-blur-lg text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Travel Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Sun className="w-8 h-8" />
                <div>
                  <h3 className="text-xl mb-2">Best Time to Visit:</h3>
                  <Badge variant="secondary" className="text-lg p-2">March to June & September to November</Badge>
                </div>
              </div>
              <p className="italic">
                Current conditions are favorable for travel. The weather is pleasant, and tourist attractions are less crowded.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <Parallax bgImage="/placeholder.svg?height=1080&width=1920" strength={300}>
        <section className="py-20 px-8 backdrop-blur-sm bg-customColor text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Top Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "The Naini Retreat", description: "Luxury hotel with panoramic lake views", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/143673163.jpg?k=918a17ec26b4a9dd0d07e0a964f757f60fc195e947839b17146d8011a7b8e5b4&o=&hp=1" },
                { name: "Manu Maharani", description: "4-star hotel with excellent amenities", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/e2/17/81/manu-maharani-resorts.jpg?w=1200&h=-1&s=1" },
                { name: "Shervani Hilltop", description: "Serene location with beautiful gardens", image: "https://tse4.mm.bing.net/th/id/OIP.8Rcm3nM004-5Q7KgYSSA0gAAAA?rs=1&pid=ImgDetMain" },
              ].map((hotel, index) => (
                <Card key={index} className="bg-white/10 text-white backdrop-blur-lg overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <Hotel className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-semibold text-white">{hotel.name}</h3>
                    <p>{hotel.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>
      </Parallax>

      <section className="py-20 px-8" style={{ backgroundColor: 'var(--customColor)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Talk to a Local Guide</h2>
          <Card className="bg-white/10 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img src="/placeholder.svg?height=100&width=100" alt="Local Guide" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold">Rahul Sharma</h3>
                  <p className="text-sm">Nainital Expert | 10+ Years Experience</p>
                </div>
              </div>
              <p className="mb-4">
                "Hello! I'm Rahul, your local guide to the wonders of Nainital. With over a decade of experience, I can help you discover hidden gems, plan your itinerary, and make the most of your visit to our beautiful city."
              </p>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat with Rahul
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="py-20 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Experience Nainital</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/OAaXGMW0Uf0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Nainital Experience"
                  className="w-full h-full rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <footer className="py-10 text-center bg-customColor text-white">
        <p>© 2024 Nainital Travels. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NainitalPage;
