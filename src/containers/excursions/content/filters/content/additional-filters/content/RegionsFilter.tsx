import { useTranslation } from "next-i18next";
import { Stack, Typography } from "@mui/material";
import { AutocompleteElement } from "react-hook-form-mui";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectRegions } from "@/store/excursions-slice/excursions.selectors";
import { getRegionsThunk } from "@/store/excursions-slice/excursions.thunks";

const RegionsFilter = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const regions = useAppSelector(selectRegions);

  useEffect(() => {
    dispatch(getRegionsThunk({ language: i18n.language }));
  }, [i18n.language]);

  return (
    <Stack>
      <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
        {t("search.filters.regions")}
      </Typography>
      <AutocompleteElement
        textFieldProps={{
          placeholder: t("search.filters.regionsPlaceholder"),
        }}
        name={"regions"}
        options={regions.map((r) => ({ id: r.id, label: r.title }))}
        loading={!regions.length}
        multiple
      />
    </Stack>
  );
};

export default RegionsFilter;
