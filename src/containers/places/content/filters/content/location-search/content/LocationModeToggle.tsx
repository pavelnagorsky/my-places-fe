import { Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form-mui";
import {
  ISearchForm,
  SearchModesEnum,
} from "@/containers/places/logic/interfaces";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { useTranslation } from "next-i18next";

const LocationModeToggle = () => {
  const { t } = useTranslation("search");
  const { watch, setValue } = useFormContext<ISearchForm>();

  const selectedMode = watch("mode");
  const isOneLocation = selectedMode === SearchModesEnum.ONE_LOCATION;

  const handleToggle = () => {
    if (isOneLocation) {
      setValue("mode", SearchModesEnum.ROUTE);
      setValue("radius", 50);
    } else {
      setValue("mode", SearchModesEnum.ONE_LOCATION);
      setValue("radius", 100);
    }
  };

  return (
    <Stack
      direction={"row"}
      width={"fit-content"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"1em"}
      mb={1.5}
      sx={{
        p: "0.375em",
        borderRadius: "40px",
        backgroundColor: primaryBackground,
      }}
    >
      <Button
        sx={{
          fontSize: { xs: "18px", md: "20px" },
          textTransform: "none",
          borderRadius: "40px",
          px: "1em",
          color: isOneLocation ? undefined : "primary.main",
        }}
        onClick={handleToggle}
        variant={isOneLocation ? "contained" : "text"}
      >
        {t("filters.locationSearch.title")}
      </Button>
      <Button
        sx={{
          fontSize: { xs: "18px", md: "20px" },
          textTransform: "none",
          borderRadius: "40px",
          px: "1em",
          color: !isOneLocation ? undefined : "primary.main",
        }}
        onClick={handleToggle}
        variant={!isOneLocation ? "contained" : "text"}
      >
        {t("filters.routeSearch.title")}
      </Button>
    </Stack>
  );
};

export default LocationModeToggle;
