import { useEffect, useState } from "react";
import { SearchModesEnum } from "@/containers/places/logic/interfaces";
import { ILatLngCoordinate } from "@/components/map/Map";
import { useAppSelector } from "@/store/hooks";
import { selectSearchFilters } from "@/store/search-slice/search.slice";
import utils from "@/shared/utils";
import { buffer, lineString } from "@turf/turf";

const useRoutePolygon = () => {
  const filters = useAppSelector(selectSearchFilters);
  const [polygonPaths, setPolygonPaths] = useState<ILatLngCoordinate[]>([]);

  const addPolygonOffset = (
    polygonCoordinates: number[][],
    offsetKm: number
  ): ILatLngCoordinate[] => {
    try {
      const line = lineString(polygonCoordinates);
      const buffered = buffer(line as any, offsetKm, { units: "kilometers" });
      const bufferedPolygonCoordinates = buffered?.geometry?.coordinates ?? [];
      const flattenedCoordinates: ILatLngCoordinate[] = [];
      bufferedPolygonCoordinates.forEach((coordinatesChunk) => {
        coordinatesChunk.forEach((coordinatesSet) => {
          if (Array.isArray(coordinatesSet[0])) {
            // Needs additional iteration
            coordinatesSet.forEach((coordinates) => {
              if (!Array.isArray(coordinates)) return;
              flattenedCoordinates.push({
                lat: coordinates[1],
                lng: coordinates[0],
              });
            });
          } else {
            if (!Array.isArray(coordinatesSet)) return;
            flattenedCoordinates.push({
              lat: coordinatesSet[1] as number,
              lng: coordinatesSet[0] as number,
            });
          }
        });
      });
      return flattenedCoordinates;
    } catch (e) {
      return [];
    }
  };

  const handleRoutePolygon = (
    startCoordinate: ILatLngCoordinate,
    endCoordinate: ILatLngCoordinate,
    offsetKm: number
  ) => {
    if (!window.google?.maps?.DirectionsService) return;
    try {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startCoordinate,
          destination: endCoordinate,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && !!result) {
            const route = result.routes[0].overview_path;
            const polygonCoords = route.map((point) => [
              point.lng(),
              point.lat(),
            ]);
            setPolygonPaths(addPolygonOffset(polygonCoords, offsetKm));
          } else {
            console.error(`Error fetching paths ${result}`);
          }
        }
      );
    } catch (e) {
      console.error("Failed to draw route polygon", e);
      setPolygonPaths([]);
    }
  };

  useEffect(() => {
    if (
      !filters ||
      filters?.mode !== SearchModesEnum.ROUTE ||
      !filters.locationStartCoordinates ||
      !filters.locationEndCoordinates
    ) {
      setPolygonPaths([]);
      return;
    }
    handleRoutePolygon(
      utils.stringToLatLng(filters.locationStartCoordinates),
      utils.stringToLatLng(filters.locationEndCoordinates),
      filters.radius
    );
  }, [filters]);

  return polygonPaths;
};

export default useRoutePolygon;
