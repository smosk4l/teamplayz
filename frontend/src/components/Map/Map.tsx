import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useFormikContext } from 'formik';

declare global {
  namespace google.maps {
    interface Autocomplete {
      getPlace(): google.maps.places.PlaceResult;
    }
  }
}

type MapProps = {
  showSearch?: boolean;
};

const Map = ({ showSearch = true }: MapProps) => {
  const { setFieldValue, values } = useFormikContext() || {};
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 50.049683,
    lng: 19.944544,
  });
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const { latLng } = event;
    if (!latLng) return;

    const lat = latLng.lat();
    const lng = latLng.lng();

    setMarkerPosition({ lat, lng });

    if (!setFieldValue) return;
    setFieldValue('lat', lat);
    setFieldValue('lng', lng);
  };

  useEffect(() => {
    if (isLoaded && inputRef.current && showSearch) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          setCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });
      autocompleteRef.current = autocomplete;
    }
  }, [isLoaded, showSearch]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {showSearch && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          style={{ width: '100%', height: '40px' }}
        />
      )}
      <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </>
  );
};

export default Map;
