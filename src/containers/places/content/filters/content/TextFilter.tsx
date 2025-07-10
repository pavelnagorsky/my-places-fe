import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  debounce,
  InputAdornment,
  SxProps,
  Typography,
} from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";
import { useCallback } from "react";

const TextFilter = ({
  sx,
  onChange,
}: {
  sx?: SxProps;
  onChange?: () => void;
}) => {
  const { t } = useTranslation("search");

  const debouncedSubmit = useCallback(
    debounce((value) => {
      if (typeof onChange === "function") onChange();
    }, 300),
    [typeof onChange] // Empty dependency array ensures it's created once
  );

  return (
    <Box sx={sx}>
      <Typography
        fontSize={"18px"}
        mb={"0.5em"}
        component={"label"}
        display={"inline-block"}
        htmlFor={"search"}
      >
        {t("filters.searchByTitle")}
      </Typography>
      <TextFieldElement
        id={"search"}
        sx={{
          width: "100%",
        }}
        onChange={debouncedSubmit}
        name={"search"}
        placeholder={t("filters.enterTitle")}
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
    </Box>
  );
};

export default TextFilter;
