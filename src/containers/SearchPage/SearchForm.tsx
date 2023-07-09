import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {
  LocationAutocomplete,
  PlaceType,
} from "./Filters/LocationAutocomplete";
import { ILatLngCoordinate } from "@/components/Map/Map";
import googlePlacesAutocompleteService from "@/services/google-places-service/google-places.service";
import { Button } from "@/components/UI/Button/Button";
import { useTranslation } from "next-i18next";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import usePlacesSearch from "@/containers/SearchPage/usePlacesSearch";
import { RadiusPopover } from "@/containers/SearchPage/Filters/RadiusPopover";

// const data: IPlace[] = [
//   {
//     location: {
//       lat: 53.944187372354264,
//       lng: 24.87368181834729,
//     },
//   },
//   {
//     location: {
//       lat: 53.544187372354264,
//       lng: 24.87368181834729,
//     },
//   },
//   {
//     location: {
//       lat: 52.244187372354264,
//       lng: 25.47368181834729,
//     },
//   },
//   {
//     location: {
//       lat: 52.444187372354264,
//       lng: 30.97368181834729,
//     },
//   },
//   {
//     location: {
//       lat: 52.444187372354264,
//       lng: 32.17368181834729,
//     },
//   },
//   {
//     location: {
//       lat: 52.94187372354264,
//       lng: 30.97368181834729,
//     },
//   },
//   {
//     location: {
//       lat: 52.844187372354264,
//       lng: 30.77368181834729,
//     },
//   },
// ];

interface ISearchFormProps {
  readonly places: ISearchPlace[];
  readonly selectedPlace: PlaceType | null;
  readonly setSelectedPlace: (p: PlaceType | null) => void;
  readonly setCircle: (c: google.maps.Circle | null) => void;
  readonly setFitCoordinates: (coordinates: ILatLngCoordinate[]) => void;
  readonly setCardResults: (res: ISearchPlace[]) => void;
  readonly setMapResults: (res: ISearchPlace[]) => void;
  readonly setPolygonsEnabled: (flag: boolean) => void;
}

function SearchForm({
  places,
  selectedPlace,
  setSelectedPlace,
  setCircle,
  setFitCoordinates,
  setCardResults,
  setMapResults,
  setPolygonsEnabled,
}: ISearchFormProps) {
  const { t } = useTranslation("searchPage");
  const searchService = usePlacesSearch();
  // place id from google autocomplete
  const [placeId, setPlaceId] = useState<string>();
  const handleSetPlaceId = (id: string) => {
    setPlaceId(id);
  };

  // search by radius
  const [radiusEnabled, setRadiusEnabled] = useState(false);
  const [radius, setRadius] = useState<number | string>(100);

  useEffect(() => {
    if (places) {
      setCardResults(places);
      setMapResults(places);
    }
  }, [places]);

  const resetValues = (newResults: ISearchPlace[]) => {
    setMapResults(newResults);
    setCardResults(newResults);
    setCircle(null);
  };

  const handleSearch = () => {
    const searchResults = places;
    // filtering by checkboxes etc...
    resetValues(searchResults);

    // filtering by google map
    if (!placeId || !selectedPlace) {
      setFitCoordinates([]);
      return;
    }
    googlePlacesAutocompleteService
      .findPlaceByPlaceId(placeId)
      .then(({ data }) => {
        if (!data.results[0]?.geometry) throw new Error("no results");
        const placeGeometry = data.results[0].geometry;
        if (radiusEnabled && typeof radius === "number") {
          // search by radius
          setPolygonsEnabled(false);
          const circleCenter = placeGeometry.location;
          const res = searchService.searchByRadius({
            circleCenter: circleCenter,
            results: searchResults,
            radius: radius,
          });
          console.log("Card results search by radius:", res.filteredResults);
          setCardResults(res.filteredResults);
          setCircle(res.circle);
          if (res.fitCoordinates) setFitCoordinates(res.fitCoordinates);
        } else if (!radiusEnabled) {
          setPolygonsEnabled(true);
          // search by bounds
          if (placeGeometry?.bounds) {
            const res = searchService.searchByBounds({
              geometryBounds: placeGeometry.bounds as any,
              results: searchResults,
            });
            setFitCoordinates(res.fitCoordinates);
            console.log("Card results search by bounds:", res.filteredResults);
            setCardResults(res.filteredResults);
          } else {
            // set map in default zoom
            setFitCoordinates([]);
          }
        }
      })
      .catch(() => {
        // set map in default zoom
        setFitCoordinates([]);
      });
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={"3em"}
        my="2em"
        alignItems={"center"}
      >
        {/*<LocationAutocomplete*/}
        {/*  setValue={setSelectedPlace}*/}
        {/*  value={selectedPlace}*/}
        {/*  onSetPlaceId={handleSetPlaceId}*/}
        {/*/>*/}
        {/*<RadiusPopover*/}
        {/*  enabled={radiusEnabled}*/}
        {/*  setEnabled={setRadiusEnabled}*/}
        {/*  setValue={setRadius}*/}
        {/*  value={radius}*/}
        {/*  maxValue={500}*/}
        {/*/>*/}
        <Button type={"submit"} variant={"contained"} onClick={handleSearch}>
          {t("filters.button")}
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchForm;
