import { debounce, InputAdornment, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldElement } from "react-hook-form-mui";
import AdditionalFilters from "@/containers/personal-area/my-favourites/filters/AdditionalFilters";

interface IFilterProps {
  onSubmit: () => void;
}

const Filters = ({ onSubmit }: IFilterProps) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction={"row"}
      gap={"1em"}
      alignItems={"center"}
      width={{ xs: "100%", lg: "80%" }}
    >
      <TextFieldElement
        onChange={debounce(() => onSubmit(), 300)}
        placeholder={"Название места"}
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
