import { useTranslation } from "next-i18next";
import { Badge, Box, Button, Stack, Typography } from "@mui/material";
import usePopover from "@/hooks/usePopover";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  CheckboxButtonGroup,
  CheckboxElement,
  useFormContext,
} from "react-hook-form-mui";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";
import { IExcursionsFilters } from "@/containers/excursions/excursions-catalog/logic/interfaces";
import { StyledButton } from "@/components/UI/button/StyledButton";
import RegionsFilter from "@/containers/excursions/excursions-catalog/content/filters/content/additional-filters/content/RegionsFilter";
import PlaceTypesFilter from "@/containers/excursions/excursions-catalog/content/filters/content/additional-filters/content/PlaceTypesFilter";
import AdditionalFiltersLayout from "@/containers/excursions/excursions-catalog/content/filters/content/additional-filters/layout/AdditionalFiltersLayout";
import { useAppSelector } from "@/store/hooks";
import { selectSearchFilters } from "@/store/excursions-slice/excursions.selectors";
import CitiesFilter from "@/containers/excursions/excursions-catalog/content/filters/content/additional-filters/content/CitiesFilter";

const AdditionalFilters = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation(["excursion-management", "common"]);
  const popover = usePopover("filters");
  const types = useExcursionTypes();
  const travelModes = useTravelModeOptions();
  const { resetField } = useFormContext<IExcursionsFilters>();
  const appliedFilters = useAppSelector(selectSearchFilters);

  const countFilters = () => {
    let count = 0;
    if (!appliedFilters) return count;
    count += appliedFilters.travelModes.length;
    count += appliedFilters.types.length;
    count += appliedFilters.placeTypeIds.length;
    count += appliedFilters.regions.length;
    count += appliedFilters.cities.length;
    count += Number(appliedFilters.isPrimary);
    return count;
  };
  const filtersCount = countFilters();

  const handleReset = () => {
    resetField("travelModes", { defaultValue: [] });
    resetField("types", { defaultValue: [] });
    resetField("placeTypeIds", { defaultValue: [] });
    resetField("regions", { defaultValue: [] });
    resetField("cities", { defaultValue: [] });
    resetField("isPrimary", { defaultValue: false });
  };

  const handleApply = () => {
    popover.handleClose();
    onSubmit();
  };

  const toggle = (
    <StyledButton
      size={"large"}
      onClick={popover.handleOpen}
      variant={"contained"}
      startIcon={
        <Badge sx={{}} badgeContent={filtersCount}>
          {popover.open ? <CloseIcon /> : <TuneIcon />}
        </Badge>
      }
      sx={{
        fontSize: "16px",
        borderRadius: "12px",
        minWidth: { md: "150px" },
        height: "56px !important",
      }}
    >
      {t("search.filters.title")}
    </StyledButton>
  );

  return (
    <Box>
      {toggle}
      <AdditionalFiltersLayout popoverProps={popover}>
        <Box p={2}>
          <Stack width={"100%"} gap={2.5}>
            <Stack>
              <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
                {t("search.filters.type")}
              </Typography>
              <CheckboxButtonGroup name={"types"} options={types} row />
              <CheckboxElement
                name={"isPrimary"}
                label={t("search.filters.isPrimary")}
              />
            </Stack>
            <Stack>
              <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
                {t("search.filters.travelMode")}
              </Typography>
              <CheckboxButtonGroup
                name={"travelModes"}
                options={travelModes}
                row
              />
            </Stack>
            <RegionsFilter />
            <CitiesFilter />
            <PlaceTypesFilter />
          </Stack>
          <Stack
            position={"sticky"}
            py={2}
            bottom={0}
            zIndex={1}
            bgcolor={"white"}
            direction={"row"}
            gap={2}
            justifyContent="space-between"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            <Button variant="text" size={"large"} onClick={handleReset}>
              {t("buttons.clear", { ns: "common" })}
            </Button>
            <Button variant="contained" onClick={handleApply}>
              {t("buttons.apply", { ns: "common" })}
            </Button>
          </Stack>
        </Box>
      </AdditionalFiltersLayout>
    </Box>
  );
};

export default AdditionalFilters;
