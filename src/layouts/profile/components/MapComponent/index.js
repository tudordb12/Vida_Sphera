// MapComponent.js
import React from 'react';

const MapComponent = ({ city, country }) => {
  // Create a URL for Google Maps using the city and country
  const mapUrl = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(city)},${encodeURIComponent(country)}`;

  return (
    <iframe
      title="Google Map"
      src={mapUrl}
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
    />
  );
};

export default MapComponent;