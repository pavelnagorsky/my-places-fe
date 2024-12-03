import { Stack, Typography } from "@mui/material";
import LocationModeToggle from "@/containers/search-page/filters/content/location-search/content/LocationModeToggle";
import LocationAutocomplete from "@/containers/search-page/filters/content/location-search/content/location-autocomplete/LocationAutocomplete";
import { useFormContext } from "react-hook-form-mui";
import {
  ISearchForm,
  SearchModesEnum,
} from "@/containers/search-page/interfaces";
import SearchByMe from "@/containers/search-page/filters/content/location-search/content/SearchByMe";
import { useTranslation } from "next-i18next";

const LocationSearch = () => {
  const { t } = useTranslation("search");
  const { watch } = useFormContext<ISearchForm>();
  const selectedMode = watch("mode");
  const isSearchByMe = watch("searchByMe");

  return (
    <Stack gap={"1em"}>
      <LocationModeToggle />
      <Typography mb={"0.5em"}>
        {selectedMode === SearchModesEnum.ONE_LOCATION
          ? t("filters.locationSearch.description")
          : t("filters.routeSearch.description")}
      </Typography>
      <Stack>
        <LocationAutocomplete
          textFieldProps={{ label: t("filters.locationStartLabel") }}
          disabled={isSearchByMe}
          fieldName={"locationStart"}
          fieldNameCoordinates={"locationStartCoordinates"}
        />
        <SearchByMe />
      </Stack>
      {selectedMode === SearchModesEnum.ROUTE && (
        <LocationAutocomplete
          textFieldProps={{ label: t("filters.locationEndLabel") }}
          fieldName={"locationEnd"}
          fieldNameCoordinates={"locationEndCoordinates"}
        />
      )}
    </Stack>
  );
};

export default LocationSearch;
