import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLocationInfo } from '../lib/api';

function LocationInfo() {
  const { locationName } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLocationInfo() {
      try {
        const data = await getLocationInfo(locationName);
        setLocationData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch location information');
        setLoading(false);
      }
    }

    fetchLocationInfo();
  }, [locationName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!locationData) return <div>No information available</div>;

  return (
    <div className="location-info">
      <h1>{locationName}</h1>
      <img src={locationData.image} alt={locationName} />
      <p>{locationData.description}</p>
      <h2>Top Places to Visit</h2>
      <ul>
        {locationData.places.map((place, index) => (
          <li key={index}>
            <h3>{place.name}</h3>
            <img src={place.image} alt={place.name} />
            <p>{place.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationInfo;