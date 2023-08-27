import Map, { ILatLngCoordinate } from "../../components/Map/Map";
import { Circle, InfoWindow, Marker } from "@react-google-maps/api";
import { Fragment, useMemo, useState } from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import FormContainer from "@/containers/SearchPage/FormContainer";
import PlaceCard from "@/components/PlaceCard/PlaceCard";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import PlaceCardSkeleton from "@/components/PlaceCard/PlaceCardSkeleton";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/hoc/WithSearch";
import utils from "@/shared/utils";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import { useAppSelector } from "@/store/hooks";
import {
  selectLoading,
  selectPagination,
  selectPlaces,
} from "@/store/search-results-slice/search-results.slice";
import { useTranslation } from "next-i18next";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import PlaceCardMap from "@/components/PlaceCard/PlaceCardMap";
import SearchPagination from "@/containers/SearchPage/SearchPagination";

function SearchPage() {
  const { t } = useTranslation("searchPage");
  // responsive design tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // info about search request
  const places = useAppSelector(selectPlaces);
  const pagination = useAppSelector(selectPagination);
  const loading = useAppSelector(selectLoading);
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);
  //const polygons = usePolygons({ address: selectedPlace });

  const handleClickMarker = (placeId: number) => {
    const place = places.find((p) => p.id === placeId);
    if (!place) return;
    // close and open again to prevent Google Maps bug of not displaying info window
    setSelectedPlace(null);
    setTimeout(() => setSelectedPlace(place), 100);
  };

  const form = useFormContext<ISearchForm>();
  const searchRadius = form.getValues("radius");
  const searchCoordinates = form.watch("search");
  const showMap = form.watch("showMap");

  const placesCoordinates = useMemo(() => {
    return places.map((p) => ({ ...p.coordinates, id: p.id }));
  }, [places]);

  const mapCircle = useMemo(() => {
    if (!searchCoordinates) return;
    const latLng = utils.stringToLatLng(searchCoordinates);
    if (!latLng) return;
    return new google.maps.Circle({
      center: latLng,
      radius: utils.kmToMeters(searchRadius),
    });
  }, [searchRadius, searchCoordinates]);

  const mapFitBounds: ILatLngCoordinate[] = useMemo(() => {
    if (mapCircle) {
      const bounds = mapCircle.getBounds();
      return [
        bounds?.getNorthEast().toJSON(),
        bounds?.getSouthWest().toJSON(),
      ] as ILatLngCoordinate[];
    }
    return placesCoordinates;
  }, [mapCircle, placesCoordinates]);

  return (
    <Fragment>
      <ScrollToTopButton />
      <Box bgcolor={primaryBackground}>
        <WrappedContainer
          wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
          bgColor={primaryBackground}
        >
          <FormContainer />
        </WrappedContainer>
      </Box>
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
      >
        <Box mt={"2.5em"} display={!showMap && isMobile ? "none" : "block"}>
          <Map
            containerStyle={{ height: isMobile ? "323px" : "600px" }}
            fitCoordinates={mapFitBounds}
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
            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.coordinates}
                options={{
                  ariaLabel: "selected place",
                  pixelOffset: new window.google.maps.Size(0, -30),
                }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <PlaceCardMap place={selectedPlace} />
              </InfoWindow>
            )}
            {placesCoordinates.map((res, i) => (
              <Marker
                key={i}
                position={res}
                onClick={() => handleClickMarker(res.id)}
              />
            ))}
          </Map>
        </Box>
        <Typography
          fontSize={"20px"}
          my={{ xs: "1.5em", md: "2em" }}
          fontWeight={700}
          component={"h1"}
        >
          {!loading && places.length === 0
            ? t("noResults")
            : `${t("placesFound")}: ${pagination.totalResults}`}
        </Typography>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Stack
            width={{
              xs: "330px",
              sm: "700px",
              md: "790px",
              xl: "100%",
            }}
            flexWrap={"wrap"}
            direction={{ xs: "column", sm: "row" }}
            rowGap={{ xs: "2em", md: "3em" }}
            columnGap={{ xs: "1em", sm: "2em", md: "2.5em", xl: "2.3em" }}
          >
            {loading &&
              [1, 2, 3, 4].map((place, index) => (
                <PlaceCardSkeleton key={index} />
              ))}
            {places.map((place, index) => (
              <PlaceCard place={place} key={index} />
            ))}
          </Stack>
        </Stack>
        <SearchPagination {...pagination} currentResultsCount={places.length} />
      </WrappedContainer>
    </Fragment>
  );
}

export default SearchPage;
