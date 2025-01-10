import { useTranslation } from "next-i18next";
import { Box, InputAdornment, Typography } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";

const DescriptionFilter = () => {
  const { t } = useTranslation("search");
  return (
    <Box>
      <Typography
        fontSize={"18px"}
        mb={"0.5em"}
        component={"label"}
        display={"inline-block"}
        htmlFor={"description"}
      >
        {t("filters.searchByDescription")}
      </Typography>
      <TextFieldElement
        id={"description"}
        multiline
        sx={{
          width: "100%",
          mb: "1em",
        }}
        name={"description"}
        placeholder={t("filters.enterDescription")}
      />
    </Box>
  );
};

export default DescriptionFilter;
