import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form-mui";
import MoreFiltersPopover from "@/containers/SearchPage/Filters/MoreFiltersPopover";
import { useEffect, useState } from "react";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";

export interface ISearchForm {
  categories: number[];
  types: number[];
  title: string;
}

function FormContainer() {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState<IPlaceCategory[]>([]);
  const [types, setTypes] = useState<IPlaceType[]>([]);

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
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
    <Box>
      <FormProvider {...formContext}>
        <MoreFiltersPopover
          types={types}
          categories={categories}
          startText={"Фильтры"}
        />
      </FormProvider>
    </Box>
  );
}

export default FormContainer;
