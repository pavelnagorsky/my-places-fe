import { debounce, InputAdornment, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldElement } from "react-hook-form-mui";
import AdditionalFilters from "@/containers/moderation/places/places-list/filters/AdditionalFilters";

interface IFilterProps {
  onSubmit: () => void;
  type: "reviews" | "places";
}

const Filters = ({ onSubmit, type }: IFilterProps) => {
  const { t } = useTranslation("moderation");

  return (
    <Stack
      direction={"row"}
      gap={"1em"}
      alignItems={"center"}
      width={{ xs: "100%", lg: "80%" }}
    >
      <TextFieldElement
        onChange={debounce(() => onSubmit(), 300)}
        placeholder={
          type === "places" ? t("filters.placeTitle") : t("filters.reviewTitle")
        }
        name={"search"}
        id={"searchText"}
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <AdditionalFilters onSubmit={onSubmit} />
    </Stack>
  );
};

export default Filters;
