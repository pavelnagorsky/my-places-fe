import Box from "@mui/material/Box";
import MoreFiltersPopover from "@/containers/SearchPage/Filters/FilterContainers/MoreFiltersPopover";
import { useEffect, useMemo, useState } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import { RadiusPopover } from "@/containers/SearchPage/Filters/FilterContainers/RadiusPopover";
import { Stack } from "@mui/material";
import LocationPopover from "@/containers/SearchPage/Filters/FilterContainers/LocationPopover";
import { SwitchElement, useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/hoc/WithSearch";
import { ISearchPlacesRequest } from "@/services/places-service/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  performSearchThunk,
  selectCurrentPage,
} from "@/store/search-results-slice/search-results.slice";
import MobileFiltersPopover from "@/containers/SearchPage/Filters/FilterContainers/MobileFiltersPopover";
import Media from "@/hoc/Media/Media";

const ITEMS_PER_PAGE = 9;

function FormContainer() {
  const { t, i18n } = useTranslation("searchPage");
  const [types, setTypes] = useState<IPlaceType[]>([]);
  const form = useFormContext<ISearchForm>();
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    search();
  }, [i18n.language, currentPage]);

  const search = () => {
    form.handleSubmit((data) => {
      console.log(data);
      const payload: ISearchPlacesRequest = {
        searchCoordinates: data.search,
        radius: data.radius,
        language: i18n.language,
        itemsPerPage: ITEMS_PER_PAGE,
        typesIds: data.types.concat(data.typesCommercial),
        title: data.title,
        pageToReturn: currentPage,
      };
      dispatch(performSearchThunk(payload));
    })();
  };

  useEffect(() => {
    placeTypesService
      .getAll(i18n.language)
      .then(({ data }) => {
        setTypes(data);
      })
      .catch(() => {});
  }, [i18n.language]);

  const nonCommercialTypes = useMemo(
    () => types.filter((t) => !t.commercial),
    [types]
  );
  const commercialTypes = useMemo(
    () => types.filter((t) => t.commercial),
    [types]
  );

  return (
    <Box py={"1.6em"}>
      <Media sm={"none"}>
        <Stack
          direction={"row"}
          gap={"1em"}
          alignItems={"center"}
          // justifyContent={"space-between"}
        >
          <Box flexGrow={1}>
            <MobileFiltersPopover
              startText={t("filters.filters")}
              typesCommercial={commercialTypes}
              types={nonCommercialTypes}
              triggerSubmit={search}
            />
          </Box>
          <SwitchElement
            label={t("filters.map")}
            name={"showMap"}
            labelPlacement={"top"}
          />
        </Stack>
      </Media>
      <Media xs={"none"} sm={"block"}>
        <Stack direction={"row"} gap={"3em"} justifyContent={"space-between"}>
          <LocationPopover
            triggerSubmit={search}
            startText={t("filters.location")}
          />
          <RadiusPopover
            triggerSubmit={search}
            startText={t("filters.searchRadius")}
          />
          <MoreFiltersPopover
            triggerSubmit={search}
            types={nonCommercialTypes}
            typesCommercial={commercialTypes}
            startText={t("filters.filters")}
          />
        </Stack>
      </Media>
    </Box>
  );
}

export default FormContainer;
