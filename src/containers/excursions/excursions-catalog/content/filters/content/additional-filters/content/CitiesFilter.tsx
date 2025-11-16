import { useTranslation } from "next-i18next";
import { Stack, Typography } from "@mui/material";
import { AutocompleteElement } from "react-hook-form-mui";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCities } from "@/store/excursions-slice/excursions.selectors";
import { getCitiesThunk } from "@/store/excursions-slice/excursions.thunks";

const CitiesFilter = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const cities = useAppSelector(selectCities);

  useEffect(() => {
    dispatch(getCitiesThunk({ language: i18n.language }));
  }, [i18n.language]);

  return (
    <Stack>
      <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
        {t("search.filters.cities")}
      </Typography>
      <AutocompleteElement
        textFieldProps={{
          placeholder: t("search.filters.citiesPlaceholder"),
        }}
        name={"cities"}
        options={cities.map((c) => ({ id: c.id, label: c.title }))}
        loading={!cities.length}
        multiple
      />
    </Stack>
  );
};

export default CitiesFilter;
