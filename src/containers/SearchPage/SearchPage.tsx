import Map, { ILatLngCoordinate } from "../../components/Map/Map";
import { Circle, Marker, Polygon, Polyline } from "@react-google-maps/api";
import { Fragment, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PlaceType } from "@/containers/SearchPage/LocationAutocomplete/LocationAutocomplete";
import { usePolygons } from "@/hooks/usePolygons";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import FormContainer from "@/containers/SearchPage/Filters/FormContainer";
import { fakePlaces } from "@/components/PlaceCard/fakeData";
import PlaceCard from "@/components/PlaceCard/PlaceCard";
import PrimaryDivider from "@/components/UI/PrimaryDivider/PrimaryDivider";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import SearchForm from "@/containers/SearchPage/SearchForm";
import PlaceCardSkeleton from "@/components/PlaceCard/PlaceCardSkeleton";

interface ISearchPageProps {
  places: ISearchPlace[];
}

export function SearchPage({ places }: ISearchPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // info about place name from autocomplete
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);

  // coordinates to zoom map
  const [fitCoordinates, setFitCoordinates] = useState<ILatLngCoordinate[]>([]);
  // found card results
  const [cardResults, setCardResults] = useState<ISearchPlace[]>([]);
  // found map results
  const [mapResults, setMapResults] = useState<ISearchPlace[]>([]);

  const [polygonsEnabled, setPolygonsEnabled] = useState(true);
  const polygons = usePolygons({ address: selectedPlace });
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);

  return (
    <Fragment>
      <Box bgcolor={primaryBackground}>
        <WrappedContainer
          wrapperSx={{ px: { xs: "1em", md: "3em", lg: "7.5em" } }}
          bgColor={primaryBackground}
        >
          <FormContainer />
        </WrappedContainer>
      </Box>
      {/*<SearchForm*/}
      {/*  places={places}*/}
      {/*  setPolygonsEnabled={setPolygonsEnabled}*/}
      {/*  setCardResults={setCardResults}*/}
      {/*  setMapResults={setMapResults}*/}
      {/*  selectedPlace={selectedPlace}*/}
      {/*  setSelectedPlace={setSelectedPlace}*/}
      {/*  setCircle={setCircle}*/}
      {/*  setFitCoordinates={setFitCoordinates}*/}
      {/*/>*/}
      <WrappedContainer
        wrapperSx={{ px: { xs: "1em", md: "3em", lg: "7.5em" } }}
      >
        <Box mt={"2.5em"}>
          <Map
            containerStyle={{ height: isMobile ? "323px" : "600px" }}
            fitCoordinates={fitCoordinates}
          >
            {circle ? (
              <Circle
                radius={circle.getRadius()}
                center={circle.getCenter() ?? undefined}
                options={{
                  strokeColor: theme.palette.primary.main,
                  fillOpacity: 0.15,
                }}
              />
            ) : null}
            {/*{polygonsEnabled*/}
            {/*  ? polygons.map((p, i) => (*/}
            {/*      <Polygon*/}
            {/*        paths={p.getPaths()}*/}
            {/*        key={i}*/}
            {/*        options={{*/}
            {/*          strokeColor: theme.palette.primary.main,*/}
            {/*          fillOpacity: 0.15,*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    ))*/}
            {/*  : null}*/}
            {polygonsEnabled
              ? polygons.map((p, i) => (
                  <Polyline
                    path={p.getPath()}
                    key={i}
                    options={{
                      strokeColor: theme.palette.primary.main,
                    }}
                  />
                ))
              : null}
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
          Найдено 26 мест:
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
            // page={1}
            count={3}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </WrappedContainer>
    </Fragment>
  );
}
