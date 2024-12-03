import Map from "../../components/map/Map";
import {
  Circle,
  InfoWindow,
  Marker,
  MarkerClusterer,
  Polygon,
  Rectangle,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  selectSearchFilters,
  selectTotalItems,
} from "@/store/search-slice/search.slice";
import SearchResultsLoader, {
  searchResultsGridSx,
} from "@/containers/search-page/SearchResultsLoader";
import Grid from "@mui/material/Grid2";
import FiltersContainer from "@/containers/search-page/filters/filters-container/FiltersContainer";
import OrderBySelector from "@/containers/search-page/filters/order-by-selector/OrderBySelector";
import FiltersContainerMobile from "@/containers/search-page/filters/filters-container/FiltersContainerMobile";
import { SearchModesEnum } from "@/containers/search-page/interfaces";

function SearchPage() {
  const { t } = useTranslation("search");
  // responsive design tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobileMd = useMediaQuery(theme.breakpoints.down("md"));
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

  const filters = useAppSelector(selectSearchFilters);
  const showMap = formContext.watch("showMap");

  const placesOnMap = useMemo(() => {
    return mapResults.map((p) => ({
      ...p.coordinates,
      id: p.id,
      title: p.title,
      typeIcon: (p.type.image2 || p.type.image) as string,
    }));
  }, [mapResults]);

  // Show map circle if search by location
  const mapCircle = useMemo(() => {
    if (
      !filters?.locationStartCoordinates ||
      filters.mode !== SearchModesEnum.ONE_LOCATION
    )
      return;
    const latLng = utils.stringToLatLng(filters.locationStartCoordinates);
    return new google.maps.Circle({
      center: latLng,
      radius: utils.kmToMeters(filters.radius),
    });
  }, [filters]);

  // Show map rectangle if search by route
  const mapPolygon = useMemo(() => {
    if (
      !filters?.locationStartCoordinates ||
      !filters.locationEndCoordinates ||
      filters.mode !== SearchModesEnum.ROUTE
    )
      return;
    const startLatLng = utils.stringToLatLng(filters.locationStartCoordinates);
    const endLatLng = utils.stringToLatLng(filters.locationEndCoordinates);
    const routeBounds = utils.getRouteBounds(
      startLatLng,
      endLatLng,
      filters.radius
    );

    return routeBounds;

    // return new google.maps.Rectangle({
    //   bounds: routeBounds,
    // });
  }, [filters]);

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <ScrollToTopButton />
      {isMobile && (
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Box bgcolor={primaryBackground}>
            <WrappedContainer
              wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
              bgColor={primaryBackground}
            >
              <FormProvider {...formContext}>
                <FiltersContainerMobile triggerSubmit={onSubmit} />
              </FormProvider>
            </WrappedContainer>
          </Box>
        </motion.div>
      )}
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Grid
            container
            spacing={3}
            mt={{ xs: showMap ? "2em" : 0, lg: "2em" }}
          >
            {!isMobile && (
              <Grid size={{ xs: 0, lg: 5, xl: 4.5 }}>
                <FormProvider {...formContext}>
                  <FiltersContainer triggerSubmit={onSubmit} />
                </FormProvider>
              </Grid>
            )}
            <Grid size={{ xs: 12, lg: 7, xl: 7.5 }}>
              <Box
                display={!showMap && isMobile ? "none" : "block"}
                sx={{
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
                  {mapPolygon ? (
                    <Polygon
                      paths={mapPolygon}
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
                  <MarkerClusterer maxZoom={14}>
                    {(clusterer) =>
                      placesOnMap.map((res, i) => (
                        <Marker
                          key={i}
                          clusterer={clusterer}
                          position={res}
                          title={res.title}
                          icon={{
                            url: res.typeIcon,
                            scaledSize: { width: 30, height: 30 } as any,
                          }}
                          onClick={() => handleClickMarker(res.id)}
                        />
                      ))
                    }
                  </MarkerClusterer>
                </Map>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Stack
            direction={{ md: "row" }}
            alignItems={{ md: "center" }}
            justifyContent={{ md: "space-between" }}
            gap={"1em"}
            my={{ xs: "1.5em", md: "2em" }}
          >
            <Typography fontSize={"20px"} fontWeight={700} component={"h1"}>
              {noItems
                ? t("noResults")
                : `${t("placesFound")}: ${totalItems || ""}`}
            </Typography>
            <FormProvider {...formContext}>
              <OrderBySelector triggerSubmit={onSubmit} />
            </FormProvider>
          </Stack>
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
