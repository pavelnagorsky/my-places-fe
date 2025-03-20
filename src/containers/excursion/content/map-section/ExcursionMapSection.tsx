import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Map from "@/components/map/Map";
import { useState, useEffect, memo } from "react";
import { DirectionsRenderer, InfoWindow, Marker } from "@react-google-maps/api";
import { useTranslation } from "next-i18next";
import markerIcon from "/public/images/icons/marker-filled.png";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";
import NavigatorControls from "@/containers/excursion/content/map-section/navigator-export/NavigatorControls";
import { useGoogleDirectionsService } from "@/hooks/google/useGoogleDirectionsService";
import TextWithBrTags from "@/components/UI/text-with-br-tags/TextWithBrTags";

const ExcursionMapSection = ({ excursion }: { excursion: IExcursion }) => {
  const { t, i18n } = useTranslation("excursion-management");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMobileLg = useMediaQuery(theme.breakpoints.down("lg"));
  const { directionsService, isInitialized } = useGoogleDirectionsService();
  const [directions, setDirections] = useState<any | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<IExcursionPlace | null>(
    null
  );

  useEffect(() => {
    setSelectedPlace(null);
  }, [i18n.language]);

  useEffect(() => {
    if (!isInitialized || !directionsService) return;
    const waypoints = excursion.places.map((place) => ({
      location: { lat: place.coordinates.lat, lng: place.coordinates.lng },
      stopover: true,
    }));
    // Set the origin to the first waypoint
    const origin = waypoints[0].location;

    // Set the destination to the last waypoint
    const destination = waypoints[waypoints.length - 1].location;

    // Exclude the first and last items from the waypoints array
    const intermediateWaypoints = waypoints.slice(1, waypoints.length - 1);
    directionsService.route(
      {
        origin,
        destination,
        waypoints: intermediateWaypoints,
        optimizeWaypoints: false,
        language: i18n.language,
        travelMode: excursion.travelMode as any,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && !!result) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
          setDirections(null);
        }
      }
    );
  }, [excursion, isInitialized]);

  return (
    <Box>
      <Stack
        direction={{ md: "row" }}
        mb={"1.5em"}
        alignItems={{ md: "center" }}
        gap={"1em"}
      >
        <Typography variant={"h2"} pb={"0em"} flexGrow={1}>
          {t("mapView")}
        </Typography>
        {isMobileLg && <NavigatorControls excursion={excursion} />}
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
        {excursion.places.map((place, index) => (
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
            <Stack gap={1}>
              <Typography variant={"body1"} fontWeight={700}>
                #
                {excursion.places.findIndex(
                  (place) => place.id === selectedPlace?.id
                ) + 1}{" "}
                - {selectedPlace.title}
              </Typography>
              <p>{selectedPlace.address}</p>
              {selectedPlace.excursionDescription && (
                <Typography variant={"body1"} fontSize={"14px"}>
                  <TextWithBrTags text={selectedPlace.excursionDescription} />
                </Typography>
              )}
            </Stack>
          </InfoWindow>
        )}
      </Map>
    </Box>
  );
};

export default memo(ExcursionMapSection);
