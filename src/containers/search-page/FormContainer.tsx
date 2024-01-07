import Box from "@mui/material/Box";
import MoreFiltersPopover from "@/containers/search-page/filters/filter-containers/MoreFiltersPopover";
import { useEffect, useMemo, useState } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import { RadiusPopover } from "@/containers/search-page/filters/filter-containers/RadiusPopover";
import { Stack } from "@mui/material";
import LocationPopover from "@/containers/search-page/filters/filter-containers/LocationPopover";
import { SwitchElement, useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/containers/search-page/WithSearch";
import { ISearchPlacesRequest } from "@/services/places-service/interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  performSearchThunk,
  selectCurrentPage,
} from "@/store/search-results-slice/search-results.slice";
import MobileFiltersPopover from "@/containers/search-page/filters/filter-containers/MobileFiltersPopover";
import Media from "@/hoc/media/Media";
import placesService from "@/services/places-service/places.service";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";

function FormContainer() {
  const { t, i18n } = useTranslation("searchPage");
  const [types, setTypes] = useState<IPlaceType[]>([]);
  const [categories, setCategories] = useState<IPlaceCategory[]>([]);
  const form = useFormContext<ISearchForm>();
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    search(false);
  }, [currentPage, i18n.language]);

  const search = (fromStart = true) => {
    form.handleSubmit((data) => {
      const payload: ISearchPlacesRequest = {
        searchCoordinates: data.search,
        radius: data.radius,
        language: i18n.language,
        itemsPerPage: placesService.ITEMS_PER_PAGE,
        categoriesIds: data.categories,
        typesIds: data.types,
        title: data.title,
        pageToReturn: fromStart ? 1 : currentPage,
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
    placeCategoriesService
      .getAll(i18n.language)
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(() => {});
  }, [i18n.language]);

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
              types={types}
              categories={categories}
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
            types={types}
            categories={categories}
            startText={t("filters.filters")}
          />
        </Stack>
      </Media>
    </Box>
  );
}

export default FormContainer;
