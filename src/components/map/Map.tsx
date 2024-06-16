import {
  memo,
  useState,
  useCallback,
  PropsWithChildren,
  CSSProperties,
  useEffect,
} from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Environment } from "@/shared/Environment";
import { defaultMapStyle } from "@/components/map/map-styles/default";
import { Box, Grow } from "@mui/material";

export interface ILatLngCoordinate {
  lat: number;
  lng: number;
}

interface IMapProps {
  height?: string;
  containerStyle?: CSSProperties;
  width?: string;
  fullscreenControlEnabled?: boolean;
  fitCoordinates?: ILatLngCoordinate[];
}

export const defaultBounds = {
  south: 51.26201100000001,
  west: 23.1783377,
  north: 56.1718719,
  east: 32.7768202,
};

export const defaultCountrySign = "By";
const libraries = ["places", "geometry"];

function Map({
  children,
  containerStyle,
  fullscreenControlEnabled,
  fitCoordinates,
}: PropsWithChildren & IMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-Map-script",
    googleMapsApiKey: Environment.googleMapsKey,
    libraries: libraries as any,
  });

  // focus map to cover all set of coordinates
  useEffect(() => {
    if (fitCoordinates && map) {
      if (fitCoordinates.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        fitCoordinates.forEach((c) => {
          bounds.extend(c);
        });
        map.fitBounds(bounds);
        // double call because we use map restriction (google maps bug)
        map.fitBounds(bounds);
      } else {
        map.fitBounds(defaultBounds);
      }
    }
  }, [fitCoordinates, map]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    map.fitBounds(defaultBounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <Grow in={isLoaded}>
      {isLoaded ? (
        <Box
          sx={{
            borderImage:
              "linear-gradient(45deg, rgba(255, 122, 0, 1), rgba(255, 184, 0, 1)) 1",
            borderStyle: "solid",
            borderWidth: "3px",
          }}
        >
          <GoogleMap
            mapContainerStyle={
              containerStyle ? containerStyle : { height: "400px" }
            }
            options={{
              styles: defaultMapStyle,
              maxZoom: 17,
              mapTypeControl: false,
              fullscreenControl: fullscreenControlEnabled,
              zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP,
              },
            }}
            mapTypeId="ROADMAP"
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {children}
          </GoogleMap>
        </Box>
      ) : (
        <div />
      )}
    </Grow>
  );
}

export default memo(Map);
