import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap as OriginalGoogleMap,
  LoadScript as OriginalLoadScript,
  Marker as OriginalMarker,
  InfoWindow as OriginalInfoWindow,
} from '@react-google-maps/api';

// Workaround: double-casting to allow children props for LoadScript.
const GoogleMap = OriginalGoogleMap as unknown as React.FC<any>;
const LoadScript = OriginalLoadScript as unknown as React.ComponentType<
  React.PropsWithChildren<{ googleMapsApiKey: string; onLoad?: () => void }>
>;
const Marker = OriginalMarker as unknown as React.FC<any>;
const InfoWindow = OriginalInfoWindow as unknown as React.FC<any>;

export interface Recommendation {
  Address: string;
  Area_Name: string;
  Bath: number;
  Bed: number;
  Rent: number;
  lat?: number;
  lng?: number;
  [key: string]: any;
}

interface GoogleMapComponentProps {
  recommendations: Recommendation[];
  selectedMarker?: Recommendation | null;
}

const containerStyle = {
  width: '100%',
  height: '100%', // fill parent container
};

const defaultCenter = {
  lat: 42.3601,
  lng: -71.0589,
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  recommendations,
  selectedMarker,
}) => {
  const [markers, setMarkers] = useState<Recommendation[]>([]);
  const [hoverMarker, setHoverMarker] = useState<Recommendation | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        if (marker.lat && marker.lng) {
          bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
        }
      });
      map.fitBounds(bounds);
      if (markers.length === 1) {
        map.setZoom(14);
      }
    }
  }, [map, markers]);

  useEffect(() => {
    if (scriptLoaded && recommendations.length > 0) {
      const geocoder = new window.google.maps.Geocoder();
      Promise.all(
        recommendations.map((rec) =>
          new Promise<Recommendation>((resolve) => {
            geocoder.geocode({ address: rec.Address }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                resolve({ ...rec, lat: location.lat(), lng: location.lng() });
              } else {
                console.error('Geocode error:', status, 'for address', rec.Address);
                resolve(rec);
              }
            });
          })
        )
      ).then((geocoded) => {
        setMarkers(geocoded);
      });
    }
  }, [scriptLoaded, recommendations]);

  // When a card is clicked, update the hover marker to the matching geocoded marker.
  useEffect(() => {
    if (selectedMarker && markers.length > 0) {
      const match = markers.find(m => m.Address === selectedMarker.Address);
      if (match) {
        setHoverMarker(match);
      } else {
        setHoverMarker(selectedMarker);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    }
  }, [selectedMarker, markers]);

  const handleMarkerMouseOver = (marker: Recommendation) => {
    if (!selectedMarker) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setHoverMarker(marker);
    }
  };

  const handleMarkerMouseOut = () => {
    if (!selectedMarker) {
      hoverTimeoutRef.current = window.setTimeout(() => {
        setHoverMarker(null);
      }, 500);
    }
  };

  // Use external selection if provided; otherwise use hover.
  const markerToShow = selectedMarker ? hoverMarker : hoverMarker;

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAhbHcfA0LUR4zSrxP4bojlUGUliKzUQG4"
      onLoad={() => setScriptLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
      >
        {markers.map((marker, idx) =>
          marker.lat && marker.lng ? (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onMouseOver={() => handleMarkerMouseOver(marker)}
              onMouseOut={handleMarkerMouseOut}
            />
          ) : null
        )}
        {hoverMarker && hoverMarker.lat && hoverMarker.lng && (
          <InfoWindow
            position={{ lat: hoverMarker.lat, lng: hoverMarker.lng }}
            onCloseClick={() => {
              if (!selectedMarker) {
                setHoverMarker(null);
              }
            }}
          >
            <div
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
              }}
              onMouseLeave={() => {
                if (!selectedMarker) {
                  hoverTimeoutRef.current = window.setTimeout(() => {
                    setHoverMarker(null);
                  }, 500);
                }
              }}
              style={{ maxWidth: '200px' }}
            >
              <h4>{hoverMarker.Address}</h4>
              <p>
                <strong>Area:</strong> {hoverMarker.Area_Name}
              </p>
              <p>
                <strong>Bedrooms:</strong> {hoverMarker.Bed}
              </p>
              <p>
                <strong>Bathrooms:</strong> {hoverMarker.Bath}
              </p>
              <p>
                <strong>Rent:</strong> ${hoverMarker.Rent}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
