import Map, { ILatLngCoordinate } from "../../components/Map/Map";
import { Circle, Marker, Polyline } from "@react-google-maps/api";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  Box,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PlaceType } from "@/containers/SearchPage/Filters/LocationAutocomplete";
import { usePolygons } from "@/hooks/usePolygons";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import FormContainer from "@/containers/SearchPage/FormContainer";
import { fakePlaces } from "@/components/PlaceCard/fakeData";
import PlaceCard from "@/components/PlaceCard/PlaceCard";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import PlaceCardSkeleton from "@/components/PlaceCard/PlaceCardSkeleton";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/hoc/WithSearch";
import utils from "@/shared/utils";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectLoading,
  selectPagination,
  selectPlaces,
} from "@/store/search-results-slice/search-results.slice";
import { useTranslation } from "next-i18next";

function SearchPage() {
  const { i18n } = useTranslation();
  // responsive design tools
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // info about search request
  const places = useAppSelector(selectPlaces);
  const pagination = useAppSelector(selectPagination);
  const loading = useAppSelector(selectLoading);

  // coordinates to zoom map
  const [fitCoordinates, setFitCoordinates] = useState<ILatLngCoordinate[]>([]);
  // found card results
  const [cardResults, setCardResults] = useState<ISearchPlace[]>([]);
  // found map results
  const [mapResults, setMapResults] = useState<ISearchPlace[]>([]);

  const [polygonsEnabled, setPolygonsEnabled] = useState(true);
  //const polygons = usePolygons({ address: selectedPlace });

  const form = useFormContext<ISearchForm>();
  const searchRadius = form.getValues("radius");
  const searchCoordinates = form.watch("search");

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
    <Fragment>
      <ScrollToTopButton />
      <Box bgcolor={primaryBackground}>
        <WrappedContainer
          wrapperSx={{ px: { xs: "1em", md: "3em", lg: "7.5em" } }}
          bgColor={primaryBackground}
        >
          <FormContainer />
        </WrappedContainer>
      </Box>
      <WrappedContainer
        wrapperSx={{ px: { xs: "1em", md: "3em", lg: "7.5em" } }}
      >
        <Box mt={"2.5em"}>
          <Map
            containerStyle={{ height: isMobile ? "323px" : "600px" }}
            fitCoordinates={fitCoordinates}
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
            {/*{polygonsEnabled*/}
            {/*  ? polygons.map((p, i) => (*/}
            {/*      <Polyline*/}
            {/*        path={p.getPath()}*/}
            {/*        key={i}*/}
            {/*        options={{*/}
            {/*          strokeColor: theme.palette.primary.main,*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    ))*/}
            {/*  : null}*/}
            {mapResults.map((res, i) => (
              <Marker key={i} position={res.coordinates} />
            ))}
          </Map>
        </Box>
        <Typography
          fontSize={"20px"}
          my={{ xs: "1.5em", md: "2em" }}
          fontWeight={700}
          component={"h1"}
        >
          Найдено мест: {pagination.totalResults}
        </Typography>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Stack
            width={{
              xs: "345px",
              sm: "730px",
              md: "790px",
              xl: "100%",
            }}
            flexWrap={"wrap"}
            direction={{ xs: "column", sm: "row" }}
            rowGap={{ xs: "2em", md: "3em" }}
            columnGap={{ xs: "1em", sm: "2em", md: "2.5em", xl: "2.3em" }}
          >
            {fakePlaces.map((place, index) => (
              <PlaceCard place={place} key={index} />
            ))}
            {[1, 2, 3, 4].map((place, index) => (
              <PlaceCardSkeleton key={index} />
            ))}
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          mt={"3em"}
          mb={"6em"}
        >
          <Pagination
            sx={{
              borderColor: "black",
            }}
            page={pagination.currentPage}
            count={pagination.totalPages}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </WrappedContainer>
    </Fragment>
  );
}

export default SearchPage;
