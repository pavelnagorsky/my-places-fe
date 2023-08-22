import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import placeTypesService from "@/services/place-types-service/place-types.service";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";

const useCreatePlaceMeta = () => {
  const { i18n } = useTranslation("create-place");
  const [placeTypes, setPlaceTypes] = useState<IPlaceType[]>([]);
  const [categories, setCategories] = useState<IPlaceCategory[]>([]);

  useEffect(() => {
    placeTypesService
      .getAll(i18n.language)
      .then(({ data }) => {
        setPlaceTypes(data.filter((t) => !t.commercial));
      })
      .catch(() => {});
  }, [i18n.language]);

  useEffect(() => {
    placeCategoriesService
      .getAll(i18n.language)
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(() => {});
  }, [i18n.language]);

  return {
    placeTypes,
    categories,
  };
};

export default useCreatePlaceMeta;
