import { useTranslation } from "next-i18next";
import { debounce, InputAdornment } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback } from "react";

const SearchFilter = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation("excursion-management");

  const onSearch = useCallback(
    debounce((value) => {
      onSubmit();
    }, 300),
    []
  );

  return (
    <TextFieldElement
      id={"search"}
      fullWidth
      sx={{ minWidth: { md: "320px" } }}
      onChange={onSearch}
      name={"search"}
      placeholder={t("search.filters.searchPlaceholder")}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position={"end"}>
              <SearchIcon color={"disabled"} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchFilter;
