import { useAppSelector } from "@/store/hooks";
import {
  selectMapResults,
  selectSearchFilters,
} from "@/store/search-slice/search.slice";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import Map from "@/components/map/Map";
import {
  Circle,
  InfoWindow,
  Marker,
  MarkerClusterer,
  Polygon,
} from "@react-google-maps/api";
import PlaceCardMap from "@/components/place-card/PlaceCardMap";
import useRoutePolygon from "@/containers/search-page/content/map-section/hooks/useRoutePolygon";
import { useTranslation } from "next-i18next";
import useMapCircle from "@/containers/search-page/content/map-section/hooks/useMapCircle";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/containers/search-page/logic/interfaces";

const MapSection = () => {
  console.log("render map");
  const { i18n } = useTranslation();
  const { watch } = useFormContext<ISearchForm>();
  const showMap = watch("showMap");
  // responsive design tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobileMd = useMediaQuery(theme.breakpoints.down("md"));
  // all places
  const mapResults = useAppSelector(selectMapResults);
  // selected place on map
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);

  const handleClickMarker = (placeId: number) => {
    const place = mapResults.find((p) => p.id === placeId);
    if (!place) return;
    // close and open again to prevent Google Maps bug of not displaying info window
    setSelectedPlace(null);
    setTimeout(() => setSelectedPlace(place), 100);
  };

  // Show map circle if search by location
  const mapCircle = useMapCircle();

  // Show map rectangle if search by route
  const mapPolygon = useRoutePolygon();

  useEffect(() => {
    setSelectedPlace(null);
  }, [i18n.language]);

  return (
    <Box
      mt={{ xs: showMap && isMobile ? "2em" : 0, md: 0 }}
      display={!showMap && isMobile ? "none" : "block"}
      sx={{
        "& .gm-style-iw-d": { overflow: "auto !important" },
        "& .gm-style-iw-c": { padding: 0, borderRadius: "15px" },
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
          height: isMobileMd ? "400px" : "600px",
          transition: "height 0.5s ease-in",
          borderRadius: "15px",
        }}
        fitCoordinates={mapResults.map((place) => place.coordinates)}
      >
        {mapCircle ? (
          <Circle
            radius={mapCircle.getRadius()}
            center={mapCircle.getCenter() ?? undefined}
            options={{
              strokeColor: theme.palette.primary.main,
              fillOpacity: 0.15,
            }}
          />
        ) : null}
        {mapPolygon.length > 0 && (
          <Polygon
            paths={mapPolygon}
            options={{
              strokeColor: theme.palette.primary.main,
              fillOpacity: 0.15,
            }}
          />
        )}
        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.coordinates}
            options={{
              ariaLabel: "Selected Place",
              pixelOffset: new window.google.maps.Size(0, -30),
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <PlaceCardMap place={selectedPlace} />
          </InfoWindow>
        )}
        <MarkerClusterer maxZoom={14}>
          {(clusterer) =>
            mapResults.map((place, i) => (
              <Marker
                key={i}
                clusterer={clusterer}
                position={place.coordinates}
                title={place.title}
                icon={{
                  url: place.type.image2 || (place.type.image as string),
                  scaledSize: { width: 30, height: 30 } as any,
                }}
                onClick={() => handleClickMarker(place.id)}
              />
            ))
          }
        </MarkerClusterer>
      </Map>
    </Box>
  );
};

export default memo(MapSection);
