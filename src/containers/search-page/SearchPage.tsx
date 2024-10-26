import Map from "../../components/map/Map";
import { Circle, InfoWindow, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import {
  Box,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FormContainer from "@/containers/search-page/filters/filter-containers/FormContainer";
import PlaceCard from "@/components/place-card/PlaceCard";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { FormProvider } from "react-hook-form-mui";
import utils from "@/shared/utils";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";
import { useTranslation } from "next-i18next";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import PlaceCardMap from "@/components/place-card/PlaceCardMap";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import usePlacesSearch from "@/containers/search-page/usePlacesSearch";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/store/hooks";
import {
  selectHasMore,
  selectItems,
  selectMapResults,
  selectNoItems,
  selectTotalItems,
} from "@/store/search-slice/search.slice";
import SearchResultsLoader, {
  searchResultsGridSx,
} from "@/containers/search-page/SearchResultsLoader";

function SearchPage() {
  const { t } = useTranslation("search");
  // responsive design tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // info about search request
  const hasMore = useAppSelector(selectHasMore);
  const noItems = useAppSelector(selectNoItems);
  const places = useAppSelector(selectItems);
  const totalItems = useAppSelector(selectTotalItems);
  const mapResults = useAppSelector(selectMapResults);
  const { formContext, onSubmit } = usePlacesSearch();
  // selected place on map
  const [selectedPlace, setSelectedPlace] = useState<ISearchPlace | null>(null);

  const handleClickMarker = (placeId: number) => {
    const place = mapResults.find((p) => p.id === placeId);
    if (!place) return;
    // close and open again to prevent Google Maps bug of not displaying info window
    setSelectedPlace(null);
    setTimeout(() => setSelectedPlace(place), 100);
  };

  const searchRadius = formContext.getValues("radius");
  const searchCoordinates = formContext.watch("search");
  const showMap = formContext.watch("showMap");

  const placesOnMap = useMemo(() => {
    return mapResults.map((p) => ({
      ...p.coordinates,
      id: p.id,
      title: p.title,
      typeIcon: (p.type.image2 || p.type.image) as string,
    }));
  }, [mapResults]);

  const mapCircle = useMemo(() => {
    if (!searchCoordinates) return;
    const latLng = utils.stringToLatLng(searchCoordinates);
    if (!latLng) return;
    return new google.maps.Circle({
      center: latLng,
      radius: utils.kmToMeters(searchRadius),
    });
  }, [searchRadius, searchCoordinates]);

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <ScrollToTopButton />
      <motion.div variants={animationVariants.defaultItemVariant}>
        <Box bgcolor={primaryBackground}>
          <WrappedContainer
            wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
            bgColor={primaryBackground}
          >
            <FormProvider {...formContext}>
              <FormContainer onSubmit={onSubmit} />
            </FormProvider>
          </WrappedContainer>
        </Box>
      </motion.div>
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Box mt={"2.5em"} display={!showMap && isMobile ? "none" : "block"}>
            <Map
              containerStyle={{
                height: isMobile ? "323px" : "500px",
                transition: "height 0.5s ease-in",
              }}
              fitCoordinates={placesOnMap}
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
              {placesOnMap.map((res, i) => (
                <Marker
                  key={i}
                  position={res}
                  title={res.title}
                  icon={{
                    url: res.typeIcon,
                    scaledSize: { width: 30, height: 30 } as any,
                  }}
                  onClick={() => handleClickMarker(res.id)}
                />
              ))}
            </Map>
          </Box>
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Typography
            fontSize={"20px"}
            my={{ xs: "1.5em", md: "2em" }}
            fontWeight={700}
            component={"h1"}
          >
            {noItems
              ? t("noResults")
              : `${t("placesFound")}: ${totalItems || ""}`}
          </Typography>
          <Stack alignItems={"center"} justifyContent={"center"} mb={"2em"}>
            <InfiniteScroll
              style={{ padding: "0 1em", margin: "0 -1em" }}
              dataLength={places.length}
              next={() => onSubmit(false)}
              hasMore={hasMore}
              loader={<SearchResultsLoader />}
            >
              <Stack sx={searchResultsGridSx}>
                {places.map((place) => (
                  <PlaceCard place={place} key={place.id} />
                ))}
              </Stack>
            </InfiniteScroll>
          </Stack>
        </motion.div>
      </WrappedContainer>
    </motion.div>
  );
}

export default SearchPage;
