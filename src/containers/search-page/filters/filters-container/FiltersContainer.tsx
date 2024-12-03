import { CircularProgress, Stack, styled } from "@mui/material";
import RadiusFilter from "@/containers/search-page/filters/content/RadiusFilter";
import TypesAndCategoriesFilter from "@/containers/search-page/filters/content/TypesAndCategoriesFilter";
import LocationSearch from "@/containers/search-page/filters/content/location-search/LocationSearch";
import { Button } from "@/components/UI/button/Button";
import { primaryColor } from "@/styles/theme/lightTheme";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/containers/search-page/interfaces";
import { useAppSelector } from "@/store/hooks";
import { selectSearchFiltersLoading } from "@/store/search-slice/search.slice";
import TitleFilter from "@/containers/search-page/filters/content/TitleFilter";

const FiltersContainer = ({ triggerSubmit }: { triggerSubmit: () => void }) => {
  const { t } = useTranslation("common");
  const { reset } = useFormContext<ISearchForm>();
  const loading = useAppSelector(selectSearchFiltersLoading);

  const onClear = () => {
    reset();
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
      <Stack
        direction={"row"}
        gap={"1em"}
        pt={"1em"}
        justifyContent={"space-between"}
      >
        <Button sx={{ color: primaryColor }} onClick={onClear}>
          {t("buttons.clear")}
        </Button>
        <Button
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
