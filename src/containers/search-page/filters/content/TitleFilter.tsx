import { useTranslation } from "next-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";

const TitleFilter = () => {
  const { t } = useTranslation("search");
  return (
    <Box>
      <Typography fontSize={"18px"} mb={"1em"} component={"p"}>
        {t("filters.searchByTitle")}
      </Typography>
      <TextFieldElement
        sx={{
          width: "100%",
          mb: "1em",
        }}
        name={"title"}
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

export default TitleFilter;
