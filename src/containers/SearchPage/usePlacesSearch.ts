import { ISearchPlace } from "@/services/places-service/search-place.interface";
import utils from "@/shared/utils";

interface ISearchByRadiusPayload {
  circleCenter: google.maps.LatLng;
  results: ISearchPlace[];
  radius: number;
}

interface ISearchByBoundsPayload {
  geometryBounds: {
    southwest: google.maps.LatLngLiteral;
    northeast: google.maps.LatLngLiteral;
  };
  results: ISearchPlace[];
}

const usePlacesSearch = () => {
  // filter results to be in circle area
  const searchByRadius = ({
    circleCenter,
    results,
    radius,
  }: ISearchByRadiusPayload) => {
    const searchCircle = new google.maps.Circle({
      center: circleCenter,
      radius: utils.kmToMeters(radius),
    });
    const filteredResults = results.filter((pos) => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        pos.coordinates,
        circleCenter
      );
      return distance <= searchCircle.getRadius();
    });
    const zoomCoordinate1 = searchCircle.getBounds()?.getNorthEast()?.toJSON();
    const zoomCoordinate2 = searchCircle.getBounds()?.getSouthWest()?.toJSON();
    const fitCoordinates =
      zoomCoordinate1 && zoomCoordinate2
        ? [zoomCoordinate1, zoomCoordinate2]
        : null;

    return {
      filteredResults: filteredResults,
      fitCoordinates: fitCoordinates,
      circle: searchCircle,
    };
  };

  // filter results to be in bounds
  const searchByBounds = ({
    geometryBounds,
    results,
  }: ISearchByBoundsPayload) => {
    const newBounds = new google.maps.LatLngBounds(
      geometryBounds.southwest,
      geometryBounds.northeast
    );
    const filteredResults = results.filter((res) => {
      return newBounds.contains(res.coordinates);
    });

    return {
      filteredResults: filteredResults,
      fitCoordinates: filteredResults.map((r) => r.coordinates),
    };
  };

  return {
    searchByRadius,
    searchByBounds,
  };
};

export default usePlacesSearch;
