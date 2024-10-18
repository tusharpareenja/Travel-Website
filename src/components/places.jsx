import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from 'framer-motion';
import { Sun, MessageCircle } from 'lucide-react'
import axios from 'axios';

const PlacePage = () => {
  const { placeName } = useParams();
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaceData = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:8080/gemini/info`, {
        place: placeName
      });
      setPlaceData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch place data:', error);
      setError('Failed to fetch place data. Please try again later.');
      setLoading(false);
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!placeData) {
    return <div className="min-h-screen flex items-center justify-center">No data available for {placeName}</div>;
  }

  return (
    <div className="min-h-screen bg-customColor text-white">
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${placeData.image}')` }}
      >
        <div className="absolute inset-0 bg-customColor opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10"
        >
          <h1 className="text-6xl font-bold mb-4 text-shadow-lg">Discover {placeName}</h1>
          <p className="text-2xl p-20 text-shadow">{placeData.description}</p>
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
          <h2 className="text-4xl font-bold mb-8 text-center">Top Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {placeData.places && placeData.places.map((place, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg overflow-hidden text-white">
                <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                  <p className="text-sm">{place.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="py-10 text-center bg-customColor text-white">
        <p>© 2024 {placeName} Travels. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PlacePage;