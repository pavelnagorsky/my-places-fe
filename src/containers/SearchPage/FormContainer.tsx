import Box from "@mui/material/Box";
import MoreFiltersPopover from "@/containers/SearchPage/Filters/MoreFiltersPopover";
import { useEffect, useMemo, useState } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import { RadiusPopover } from "@/containers/SearchPage/Filters/RadiusPopover";
import { Stack } from "@mui/material";
import LocationPopover from "@/containers/SearchPage/Filters/LocationPopover";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/hoc/WithSearch";
import { ISearchPlacesRequest } from "@/services/places-service/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  performSearchThunk,
  selectCurrentPage,
} from "@/store/search-results-slice/search-results.slice";

const ITEMS_PER_PAGE = 9;

function FormContainer() {
  const { i18n } = useTranslation();
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
      <Stack direction={"row"} gap={"3em"} justifyContent={"space-between"}>
        <LocationPopover triggerSubmit={search} startText={"Локация"} />
        <RadiusPopover
          triggerSubmit={search}
          maxValue={200}
          startText={"Радиус поиска"}
        />
        <MoreFiltersPopover
          triggerSubmit={search}
          types={nonCommercialTypes}
          typesCommercial={commercialTypes}
          startText={"Фильтры"}
        />
      </Stack>
    </Box>
  );
}

export default FormContainer;
