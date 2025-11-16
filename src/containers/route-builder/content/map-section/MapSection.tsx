import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Map from "@/components/map/Map";
import { useState, useEffect, useRef, memo } from "react";
import {
  DirectionsRenderer,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import NavigatorControls from "@/containers/route-builder/content/map-section/navigator-export/NavigatorControls";
import routeStartIcon from "/public/images/icons/route-start.png";
import routeEndIcon from "/public/images/icons/route-end.png";
import markerIcon from "/public/images/icons/marker-filled.png";
import { getRouteDirectionsThunk } from "@/store/route-builder-slice/route-builder.thunks";
import PlaceCardMap from "@/containers/places/content/cards-section/place-card/PlaceCardMap";
import { primaryColor } from "@/styles/theme/lightTheme";
import {
  selectItems,
  selectPlacesNearRoute,
  selectRouteDirections,
} from "@/store/route-builder-slice/route-builder.selectors";

const MapSection = () => {
  const { t, i18n } = useTranslation("route-management");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const routePlaces = useAppSelector(selectItems);
  const placesNearRoute = useAppSelector(selectPlacesNearRoute);
  const directions = useAppSelector(selectRouteDirections);
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);
  const { watch } = useFormContext<IRouteBuilderForm>();
  const showRouteButton =
    !!selectedPlace && !routePlaces.map((p) => p.id).includes(selectedPlace.id);

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

  const placesDependency = routePlaces.map((p) => p.id).join(",");
  useEffect(() => {
    if (!startLatLng || !routePlaces.length) return;
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
      <Box
        sx={{
          "& .cluster-div": {
            opacity: 0.8,
          },
          "& .gm-style-iw-d": { overflow: "auto !important" },
          "& .gm-style-iw-c": {
            padding: 0,
            borderRadius: "15px",
            border: "unset",
          },
          "& .gm-style-iw-chr": {
            height: 0,
            "& button": {
              "& span": {
                m: "10px 10px 0 0 !important",
              },
              bgcolor: "white !important",
              width: "auto !important",
              height: "24px !important",
            },
          },
        }}
      >
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
              zIndex={3}
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
              zIndex={3}
            />
          )}
          {routePlaces.map((place, index) => (
            <Marker
              key={place.id}
              position={place.coordinates}
              label={{
                color: "white",
                fontWeight: "700",
                text: `${index + 1}`,
              }}
              title={place.title}
              onClick={() => setSelectedPlace(place)}
              icon={{
                url: markerIcon.src,
                labelOrigin: { y: 19, x: 18 } as any,
                scaledSize: { width: 35, height: 45 } as any,
              }}
              zIndex={2}
            />
          ))}
          <MarkerClusterer
            maxZoom={14}
            clusterClass={"cluster-div"}
            options={{
              imagePath: "/images/icons/cluster-icons/m",
            }}
          >
            {(clusterer) =>
              placesNearRoute.map((place, i) => {
                return (
                  <Marker
                    key={place.id}
                    position={place.coordinates}
                    title={place.title}
                    onClick={() => setSelectedPlace(place)}
                    icon={{
                      url: place.type.image || (place.type.image2 as string),
                      scaledSize: { width: 27, height: 27 } as any,
                    }}
                    zIndex={1}
                    clusterer={clusterer}
                  />
                );
              })
            }
          </MarkerClusterer>
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.coordinates}
              options={{
                ariaLabel: "Selected Place",
                pixelOffset: new window.google.maps.Size(0, -30),
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <PlaceCardMap
                showRouteButton={showRouteButton}
                place={selectedPlace}
              />
            </InfoWindow>
          )}
        </Map>
      </Box>
    </Box>
  );
};

export default memo(MapSection);
