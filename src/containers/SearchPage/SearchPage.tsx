import Map, { ILatLngCoordinate } from "../../components/Map/Map";
import { Circle, Marker, Polygon, Polyline } from "@react-google-maps/api";
import { Fragment, useState } from "react";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
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
        <WrappedContainer bgColor={primaryBackground}>
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
      <WrappedContainer>
        <Box my={"2.5em"}>
          <Map
            containerStyle={{ height: "600px" }}
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
        <Typography fontSize={"20px"} fontWeight={700} component={"h1"}>
          Найдено 26 мест:
        </Typography>
        <Grid
          container
          mt={0}
          spacing={"1.1em"}
          mb={"2em"}
          pt={"1em"}
          pb={"3em"}
        >
          {fakePlaces.map((place, index) => (
            <Grid item xs={12} md={6} xl={4} key={index}>
              <PlaceCard place={place} />
            </Grid>
          ))}
          {fakePlaces.map((place, index) => (
            <Grid item xs={12} md={6} xl={4} key={index}>
              <PlaceCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </WrappedContainer>
    </Fragment>
  );
}
