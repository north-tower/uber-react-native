import React, { useEffect, useRef, useState } from 'react';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';


const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const MAPBOX_ACCESS_TOKEN='pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw';

  const [directions, setDirections] = useState([]);
  const mapRef = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const directionsClient = MapboxDirections({ accessToken: MAPBOX_ACCESS_TOKEN });
    const getDirections = async () => {
      if (origin && destination) {
        const resp = await directionsClient.getDirections({
          profile: 'driving',
          waypoints: [
            { coordinates: [origin.location[0], origin.location[1]] },
            { coordinates: [destination.location[0], destination.location[1]] },
          ],
          geometries: 'geojson',
        }).send();
        const coordinates = resp.body.routes[0].geometry.coordinates.map(coordinate => ({
          latitude: coordinate[1],
          longitude: coordinate[0],
        }));
        setDirections(coordinates);
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
          edgePadding: { top: 50, right: 50 , bottom: 50, left: 50},
        });
           // Get travel time and distance
     const travelTime = resp.body.routes[0].legs[0].duration;
     const distance = resp.body.routes[0].legs[0].distance;
        dispatch(setTravelTimeInformation(resp.body.routes[0].legs[0]))
      }
    };
     getDirections();
  }, [origin, destination]);

 

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: origin?.location[1] ?? 0,
        longitude: origin?.location[0] ?? 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location[1],
            longitude: origin.location[0],
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location[1],
            longitude: destination.location[0],
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}

      {directions.length > 0 && (
        <Polyline
          coordinates={directions}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
    </MapView>
  );
};

export default Map;