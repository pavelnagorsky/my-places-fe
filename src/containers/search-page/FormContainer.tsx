import Box from "@mui/material/Box";
import MoreFiltersPopover from "@/containers/search-page/filters/filter-containers/MoreFiltersPopover";
import { useEffect, useState } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import { RadiusPopover } from "@/containers/search-page/filters/filter-containers/RadiusPopover";
import { Stack } from "@mui/material";
import LocationPopover from "@/containers/search-page/filters/filter-containers/LocationPopover";
import { SwitchElement } from "react-hook-form-mui";
import MobileFiltersPopover from "@/containers/search-page/filters/filter-containers/MobileFiltersPopover";
import Media from "@/hoc/media/Media";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";

function FormContainer({ onSubmit }: { onSubmit: () => void }) {
  const { t, i18n } = useTranslation("searchPage");
  const [types, setTypes] = useState<IPlaceType[]>([]);
  const [categories, setCategories] = useState<IPlaceCategory[]>([]);

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
              triggerSubmit={onSubmit}
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
            triggerSubmit={onSubmit}
            startText={t("filters.location")}
          />
          <RadiusPopover
            triggerSubmit={onSubmit}
            startText={t("filters.searchRadius")}
          />
          <MoreFiltersPopover
            triggerSubmit={onSubmit}
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
