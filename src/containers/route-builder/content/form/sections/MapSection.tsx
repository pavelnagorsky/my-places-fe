import { Box, useMediaQuery, useTheme } from "@mui/material";
import Map from "@/components/map/Map";
import { useState, useEffect } from "react";
import { DirectionsRenderer, InfoWindow, Marker } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectItems,
  setDistance,
  setDuration,
  setItems,
} from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";

const MapSection = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const places = useAppSelector(selectItems);
  const [directions, setDirections] = useState<any | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);
  const { watch } = useFormContext<IRouteBuilderForm>();

  const coordinatesStartString = watch("searchFrom.coordinates");
  const startLatLng = coordinatesStartString
    ? utils.stringToLatLng(coordinatesStartString)
    : null;
  const coordinatesEndString = watch("searchTo.coordinates");
  const endLatLng = coordinatesEndString
    ? utils.stringToLatLng(coordinatesEndString)
    : null;

  useEffect(() => {
    setSelectedPlace(null);
  }, [i18n.language]);

  const placesDependency = places.map((p) => p.id).join(",");
  useEffect(() => {
    if (!startLatLng || !endLatLng) return;
    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = places.map((place) => ({
      location: { lat: place.coordinates.lat, lng: place.coordinates.lng },
      stopover: true,
    }));
    directionsService.route(
      {
        origin: startLatLng,
        destination: endLatLng,
        waypoints: waypoints,
        // optimizeWaypoints: true,
        language: i18n.language,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && !!result) {
          setDirections(result);
          const route = result.routes[0];
          const orderedWaypoints = route.waypoint_order.map(
            (index) => places[index]
          );
          dispatch(setItems(orderedWaypoints));
          const distanceInMeters = route.legs.reduce(
            (prev, current) => prev + (current.distance?.value ?? 0),
            0
          );
          const durationInSeconds = route.legs.reduce(
            (prev, current) => prev + (current.duration?.value ?? 0),
            0
          );
          dispatch(setDistance(distanceInMeters / 1000));
          dispatch(setDuration(durationInSeconds / 60));
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [coordinatesStartString, coordinatesEndString, placesDependency]);

  return (
    <Box>
      <Map
        containerStyle={{
          height: isMobile ? "400px" : "600px",
          transition: "height 0.5s ease-in",
          borderRadius: "15px",
        }}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
        {startLatLng && (
          <Marker
            position={startLatLng}
            label={{ color: "white", fontWeight: "700", text: `*` }}
            title={"Route start"}
          />
        )}
        {endLatLng && (
          <Marker
            position={endLatLng}
            label={{ color: "white", fontWeight: "700", text: `*` }}
            title={"Route end"}
          />
        )}
        {places.map((place, index) => (
          <Marker
            key={place.id}
            position={place.coordinates}
            label={{ color: "white", fontWeight: "700", text: `${index + 1}` }}
            title={place.title}
            onClick={() => setSelectedPlace(place)}
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.coordinates}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>
                #{places.indexOf(selectedPlace) + 1} - {selectedPlace.title}
              </h2>
              <p>{selectedPlace.address}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </Box>
  );
};

export default MapSection;
