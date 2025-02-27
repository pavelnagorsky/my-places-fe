import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Map from "@/components/map/Map";
import { useState, useEffect, useRef, memo } from "react";
import { DirectionsRenderer, InfoWindow, Marker } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import NavigatorControls from "@/containers/route-builder/content/map-section/navigator-export/NavigatorControls";
import markerIcon from "/public/images/icons/marker-filled.png";
import {
  selectExcursionDirections,
  selectItems,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { getExcursionDirectionsThunk } from "@/store/excursion-builder-slice/thunks";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";

const MapSection = () => {
  const { t, i18n } = useTranslation("excursion-management");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const places = useAppSelector(selectItems);
  const directions = useAppSelector(selectExcursionDirections);
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);
  const { watch } = useFormContext<IExcursionBuilderForm>();

  const travelMode = watch("travelMode");

  useEffect(() => {
    setSelectedPlace(null);
  }, [i18n.language]);

  const placesDependency = places.map((p) => p.id).join(",");
  useEffect(() => {
    dispatch(
      getExcursionDirectionsThunk({
        language: i18n.language,
        optimizeWaypoints: false,
        travelMode,
      })
    );
  }, [placesDependency, travelMode]);

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
