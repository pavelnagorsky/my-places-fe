import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form-mui";
import MoreFiltersPopover from "@/containers/SearchPage/Filters/MoreFiltersPopover";
import { useEffect, useState } from "react";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";
import { RadiusPopover } from "@/containers/SearchPage/Filters/RadiusPopover";
import { Stack } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";

export interface ISearchForm {
  categories: number[];
  types: number[];
  title: string;
  radius: number;
  searchByMe: boolean;
}

function FormContainer() {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState<IPlaceCategory[]>([]);
  const [types, setTypes] = useState<IPlaceType[]>([]);

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      radius: 20,
      searchByMe: false,
      types: [],
      categories: [],
    },
  });

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
    <Box py={"2em"}>
      <FormProvider {...formContext}>
        <Stack direction={"row"} gap={"3em"} justifyContent={"space-between"}>
          <RadiusPopover maxValue={100} startText={"Радиус поиска"} />
          <MoreFiltersPopover
            types={types}
            categories={categories}
            startText={"Фильтры"}
          />
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default FormContainer;
