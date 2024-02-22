import { useTranslation } from "next-i18next";
import { debounce, InputAdornment, Stack } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";
import SearchIcon from "@mui/icons-material/Search";
import AdditionalFilters from "./AdditionalFilters";

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
        placeholder={"Жалоба"}
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
