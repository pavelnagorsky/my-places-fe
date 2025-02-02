import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Map from "@/components/map/Map";
import { useState, useEffect, useRef, memo } from "react";
import { DirectionsRenderer, InfoWindow, Marker } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectItems,
  selectRouteDirections,
} from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import NavigatorControls from "@/containers/route-builder/content/form/sections/navigator-export/NavigatorControls";
import routeStartIcon from "/public/images/icons/route-start.png";
import routeEndIcon from "/public/images/icons/route-end.png";
import markerIcon from "/public/images/icons/marker-filled.png";
import { getRouteDirectionsThunk } from "@/store/route-builder-slice/thunks";

const MapSection = () => {
  const { t, i18n } = useTranslation("route-management");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const places = useAppSelector(selectItems);
  const directions = useAppSelector(selectRouteDirections);
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);
  const { watch } = useFormContext<IRouteBuilderForm>();

  const travelMode = watch("travelMode");
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
        travelMode,
      })
    );
  }, [
    coordinatesStartString,
    coordinatesEndString,
    placesDependency,
    travelMode,
  ]);

  return (
    <Box>
      <Stack
        direction={{ md: "row" }}
        mb={"1.5em"}
        alignItems={{ md: "center" }}
        gap={"1em"}
      >
        <Typography variant={"h1"} mb={"0em"} component={"h2"} flexGrow={1}>
          {t("mapView")}
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
            title={t("locationSelection.start")}
            icon={{
              url: routeStartIcon.src,
              scaledSize: { width: 50, height: 50 } as any,
            }}
          />
        )}
        {endLatLng && (
          <Marker
            position={endLatLng}
            label={{ color: "white", fontWeight: "700", text: `*` }}
            title={t("locationSelection.end")}
            icon={{
              url: routeEndIcon.src,
              scaledSize: { width: 50, height: 50 } as any,
            }}
          />
        )}
        {places.map((place, index) => (
          <Marker
            key={place.id}
            position={place.coordinates}
            label={{ color: "white", fontWeight: "700", text: `${index + 1}` }}
            title={place.title}
            onClick={() => setSelectedPlace(place)}
            icon={{
              url: markerIcon.src,
              labelOrigin: { y: 18, x: 15 } as any,
              scaledSize: { width: 30, height: 40 } as any,
            }}
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
