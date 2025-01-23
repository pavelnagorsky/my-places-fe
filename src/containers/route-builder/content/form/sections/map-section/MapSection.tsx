import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Map from "@/components/map/Map";
import { useState, useEffect, useRef, memo } from "react";
import { DirectionsRenderer, InfoWindow, Marker } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getRouteDirectionsThunk,
  selectItems,
  selectRouteDirections,
} from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import NavigatorControls from "@/containers/route-builder/content/form/sections/map-section/NavigatorControls";

const MapSection = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const places = useAppSelector(selectItems);
  const directions = useAppSelector(selectRouteDirections);
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
    dispatch(
      getRouteDirectionsThunk({
        language: i18n.language,
        startLatLng,
        endLatLng,
        optimizeWaypoints: false,
      })
    );
  }, [coordinatesStartString, coordinatesEndString, placesDependency]);

  return (
    <Box>
      <Stack
        direction={{ md: "row" }}
        mb={"1.5em"}
        alignItems={{ md: "center" }}
        gap={"1em"}
      >
        <Typography variant={"h1"} mb={"0em"} component={"h2"} flexGrow={1}>
          Визуальное построение маршрута
        </Typography>
        <NavigatorControls />
      </Stack>
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
                #
                {places.findIndex((place) => place.id === selectedPlace?.id) +
                  1}{" "}
                - {selectedPlace.title}
              </h2>
              <p>{selectedPlace.address}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </Box>
  );
};

export default memo(MapSection);
