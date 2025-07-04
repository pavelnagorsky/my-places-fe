import { Stack, Typography } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import LocationAutocomplete from "@/containers/places/content/filters/content/location-search/content/location-autocomplete/LocationAutocomplete";
import SearchByMe from "@/containers/places/content/filters/content/location-search/content/SearchByMe";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

interface IPlaceSelectionProps {
  isRouteStart: boolean;
}

const PlaceSelection = ({ isRouteStart }: IPlaceSelectionProps) => {
  const { t } = useTranslation(["route-management", "common"]);
  const baseFieldName = isRouteStart ? "searchFrom" : "searchTo";
  const {
    watch,
    clearErrors,
    trigger,
    formState: { isDirty },
  } = useFormContext<IRouteBuilderForm>();
  const isSearchByMe = watch(`${baseFieldName}.isSearchByMe`);

  useEffect(() => {
    if (!isDirty) return;
    setTimeout(() => {
      trigger(`${baseFieldName}.location`);
      clearErrors(`${baseFieldName}.location`);
    }, 100);
  }, [isSearchByMe]);

  return (
    <Stack
      p={"1em"}
      borderRadius={"15px"}
      bgcolor={primaryBackground}
      sx={{
        "& .MuiInputBase-root": { backgroundColor: "white" },
      }}
    >
      <Typography
        fontWeight={500}
        fontSize={{ xs: "18px", md: "22px" }}
        mb={"0.7em"}
      >
        {isRouteStart
          ? t("locationSelection.start")
          : t("locationSelection.end")}
      </Typography>
      <LocationAutocomplete
        textFieldProps={{
          label: isRouteStart
            ? t("locationSelection.startPlaceholder")
            : t("locationSelection.endPlaceholder"),
        }}
        disabled={isSearchByMe}
        required={!isSearchByMe}
        rules={{
          required: isSearchByMe
            ? undefined
            : t("errors.required", { ns: "common" }),
        }}
        fieldName={`${baseFieldName}.location`}
        fieldNameCoordinates={`${baseFieldName}.coordinates`}
      />
      <SearchByMe
        fieldName={`${baseFieldName}.isSearchByMe`}
        fieldNameCoordinates={`${baseFieldName}.coordinates`}
      />
    </Stack>
  );
};

export default PlaceSelection;
