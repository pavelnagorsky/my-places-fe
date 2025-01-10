import { CircularProgress, Stack, styled } from "@mui/material";
import RadiusFilter from "@/containers/search-page/content/filters/content/RadiusFilter";
import TypesAndCategoriesFilter from "@/containers/search-page/content/filters/content/TypesAndCategoriesFilter";
import LocationSearch from "@/containers/search-page/content/filters/content/location-search/LocationSearch";
import { Button } from "@/components/UI/button/Button";
import { primaryColor } from "@/styles/theme/lightTheme";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/containers/search-page/logic/interfaces";
import { useAppSelector } from "@/store/hooks";
import { selectSearchFiltersLoading } from "@/store/search-slice/search.slice";
import { defaultSearchFilters } from "@/containers/search-page/logic/default-filters";

const FiltersContainer = ({ triggerSubmit }: { triggerSubmit: () => void }) => {
  const { t } = useTranslation("common");
  const { reset } = useFormContext<ISearchForm>();
  const loading = useAppSelector(selectSearchFiltersLoading);

  const onClear = () => {
    reset(defaultSearchFilters);
  };

  return (
    <Stack
      p={"1.5em"}
      sx={{
        borderRadius: "15px",
        boxShadow: "0px 2px 30px 0px #0000000F",
      }}
    >
      <Stack
        gap={"1em"}
        sx={({ palette }) => ({
          paddingInlineEnd: "1em",
          overflowY: "auto",
          maxHeight: "493px",
          scrollbarColor: `${palette.primary.light} #F0F0F0`,
          scrollbarWidth: "thin",
        })}
      >
        <LocationSearch />
        <RadiusFilter />
        <TypesAndCategoriesFilter />
      </Stack>
      <Stack direction={"row"} gap={"1em"} pt={"1em"}>
        <Button sx={{ color: primaryColor }} fullWidth onClick={onClear}>
          {t("buttons.clear")}
        </Button>
        <Button
          fullWidth
          variant={"contained"}
          type={"submit"}
          onClick={triggerSubmit}
          endIcon={loading && <CircularProgress color={"inherit"} size={20} />}
        >
          {t("buttons.apply")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FiltersContainer;
