import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
import { motion, useAnimation } from 'framer-motion';
import { Camera, Hotel, Mountain, Sun, Umbrella, MessageCircle } from 'lucide-react'
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PlacePage = () => {
  const { placeName } = useParams();
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [placeData, setPlaceData] = useState(null);
  const [topPlaces, setTopPlaces] = useState([]);

  const fetchPlaceData = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:8080/gemini/info`, {
        place: placeName
      });
      setPlaceData(response.data);
      setTopPlaces(response.data.topAttractions || []);
    } catch (error) {
      console.error('Failed to fetch place data:', error);
    }
  }, [placeName]);

  useEffect(() => {
    fetchPlaceData();
  }, [fetchPlaceData]);

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
  }

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

  if (!placeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-customColor text-white">
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${placeData?.image}')` }}
      >
        <div className="absolute inset-0 bg-customColor opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl font-bold mb-4 text-shadow-lg">Discover {placeData.name}</h1>
          <p className="text-2xl text-shadow">{placeData.description}</p>
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
          <h2 className="text-4xl font-bold mb-8 text-center">Top 5 Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {topPlaces.slice(0, 5).map((place, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg overflow-hidden text-white">
                <img src={place?.image} alt={place.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                  <p className="text-sm">{place.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

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
                  <Badge variant="secondary" className="text-lg p-2">{placeData.bestTimeToVisit}</Badge>
                </div>
              </div>
              <p className="italic">{placeData.travelStatus}</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

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
                <img src={placeData.localGuide?.image} alt="Local Guide" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold">{placeData.localGuide.name}</h3>
                  <p className="text-sm">{placeData.localGuide.description}</p>
                </div>
              </div>
              <p className="mb-4">{placeData.localGuide.message}</p>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat with {placeData.localGuide.name}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <footer className="py-10 text-center bg-customColor text-white">
        <p>© 2024 {placeData.name} Travels. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PlacePage;