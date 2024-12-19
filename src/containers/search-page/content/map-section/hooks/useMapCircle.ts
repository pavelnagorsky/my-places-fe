import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectSearchFilters } from "@/store/search-slice/search.slice";
import { SearchModesEnum } from "@/containers/search-page/logic/interfaces";
import utils from "@/shared/utils";

const useMapCircle = () => {
  // applied search filters
  const filters = useAppSelector(selectSearchFilters);

  // Show map circle if search by location
  const mapCircle = useMemo(() => {
    if (
      !filters?.locationStartCoordinates ||
      filters.mode !== SearchModesEnum.ONE_LOCATION
    )
      return null;
    const latLng = utils.stringToLatLng(filters.locationStartCoordinates);
    return new google.maps.Circle({
      center: latLng,
      radius: utils.kmToMeters(filters.radius),
    });
  }, [filters]);

  return mapCircle;
};

export default useMapCircle;
