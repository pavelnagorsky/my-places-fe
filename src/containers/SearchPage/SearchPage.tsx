import Map, { ILatLngCoordinate } from "../../components/Map/Map";
import { Circle, Marker, Polygon, Polyline } from "@react-google-maps/api";
import { Fragment, useState } from "react";
import SearchForm from "./SearchForm";
import { useTheme } from "@mui/material";
import { PlaceType } from "@/containers/SearchPage/LocationAutocomplete/LocationAutocomplete";
import { usePolygons } from "@/hooks/usePolygons";
import { ISearchPlace } from "@/services/places-service/search-place.interface";

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
      <Map containerStyle={{ height: "600px" }} fitCoordinates={fitCoordinates}>
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
      <SearchForm
        places={places}
        setPolygonsEnabled={setPolygonsEnabled}
        setCardResults={setCardResults}
        setMapResults={setMapResults}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        setCircle={setCircle}
        setFitCoordinates={setFitCoordinates}
      />
      {cardResults.map((place) => (
        <div key={place.id}>{place.title}</div>
      ))}
    </Fragment>
  );
}
