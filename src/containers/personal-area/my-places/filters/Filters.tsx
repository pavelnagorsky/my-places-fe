import { debounce, InputAdornment, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldElement } from "react-hook-form-mui";
import AdditionalFilters from "@/containers/personal-area/my-places/filters/AdditionalFilters";

interface IFilterProps {
  onSubmit: () => void;
  type: "reviews" | "places";
}

const Filters = ({ onSubmit, type }: IFilterProps) => {
  const { t } = useTranslation("personal-area");

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
          type === "places"
            ? t("places.filters.placeTitle")
            : t("reviews.filters.reviewTitle")
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
      <AdditionalFilters type={type} onSubmit={onSubmit} />
    </Stack>
  );
};

export default Filters;
