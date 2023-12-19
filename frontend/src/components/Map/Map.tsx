import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [markerPosition, setMarkerPosition] = useState<any>(null);
  console.log(markerPosition);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  const center = { lat: 50.049683, lng: 19.944544 };

  return (
    <GoogleMap
      center={center}
      zoom={13}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onClick={handleMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

export default Map;
