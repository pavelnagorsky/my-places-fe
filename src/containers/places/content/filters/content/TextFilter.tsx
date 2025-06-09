import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Typography } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";

const TextFilter = () => {
  const { t } = useTranslation("search");
  return (
    <Box>
      <Typography
        fontSize={"18px"}
        mb={"0.5em"}
        component={"label"}
        display={"inline-block"}
        htmlFor={"title"}
      >
        {t("filters.searchByTitle")}
      </Typography>
      <TextFieldElement
        id={"title"}
        sx={{
          width: "100%",
          mb: "1em",
        }}
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
