import { memo, PropsWithChildren, useCallback, useRef, useState } from "react";
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
} from "ymap3-components";
import { Box, Grow, SxProps } from "@mui/material";
import { defaultBounds } from "@/components/map/config";
import { YMapDefaultModules } from "ymap3-components/dist/src/types";
import { yandexMapStyles } from "@/components/map/map-styles/yandex-map-styles";
import { Environment } from "@/shared/Environment";

export interface ILatLngCoordinate {
  lat: number;
  lng: number;
}

interface IMapProps {
  height?: string;
  containerStyle?: SxProps;
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
  const mapRef = useRef<any | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // // focus map to cover all set of coordinates
  // useEffect(() => {
  //   if (fitCoordinates && map) {
  //     if (fitCoordinates.length > 0) {
  //       const bounds = new google.maps.LatLngBounds();
  //       fitCoordinates.forEach((c) => {
  //         bounds.extend(c);
  //       });
  //       map.fitBounds(bounds);
  //       // double call because we use map restriction (google maps bug)
  //       map.fitBounds(bounds);
  //     } else {
  //       map.fitBounds(defaultBounds);
  //     }
  //   }
  // }, [fitCoordinates, map]);

  const onLoad = useCallback(function callback({ ymaps }: YMapDefaultModules) {
    setIsLoaded(true);
    console.log("ymaps", ymaps);
  }, []);

  return (
    <Grow in={isLoaded}>
      <Box sx={containerStyle}>
        <YMapComponentsProvider
          apiKey={Environment.yandexMapsKey}
          onLoad={onLoad}
          onError={(e) => {
            console.error("Failed to load yandex maps v3:", e);
          }}
        >
          <YMap
            location={{
              bounds: [
                [defaultBounds.west, defaultBounds.south],
                [defaultBounds.east, defaultBounds.north],
              ],
              zoom: 7,
            }}
            ref={mapRef}
            // defaultState={{
            //   bounds: [
            //     [defaultBounds.south, defaultBounds.west], // southwest coordinates
            //     [defaultBounds.north, defaultBounds.east],
            //   ],
            //   // zoom: 12,
            // }}
            // style={containerStyle ? containerStyle : { height: "400px" }}
            // width="100%"
            // options={{
            //   suppressMapOpenBlock: true,
            //   suppressObsoleteBrowserNotifier: true,
            //   maxZoom: 17,
            // }}
            // onLoad={onLoad}
            // instanceRef={(ref) => {
            //   if (ref) {
            //     setMapInstance(ref);
            //   }
            // }}
          >
            <YMapDefaultSchemeLayer customization={yandexMapStyles} />
            <YMapDefaultFeaturesLayer />
            {children}
          </YMap>
        </YMapComponentsProvider>
      </Box>
    </Grow>
  );
}

export default memo(Map);
