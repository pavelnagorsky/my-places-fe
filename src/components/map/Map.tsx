import {
  CSSProperties,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { defaultMapStyle } from "@/components/map/map-styles/default";
import { Box, Grow } from "@mui/material";
import mapConfig, { defaultBounds } from "@/components/map/config";

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

function Map({
  children,
  containerStyle,
  fullscreenControlEnabled,
  fitCoordinates,
}: PropsWithChildren & IMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader(mapConfig);

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
        <Box>
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
