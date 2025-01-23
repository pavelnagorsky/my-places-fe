import { SwitchElement } from "react-hook-form-mui";
import { Box, BoxProps, FormHelperText } from "@mui/material";
import { useTranslation } from "next-i18next";

const UpdateTranslations = (props: BoxProps) => {
  const { t } = useTranslation("common");
  return (
    <Box {...props}>
      <SwitchElement
        sx={{ mx: 0 }}
        labelPlacement={"start"}
        label={t("translations.title")}
        name={"updateTranslations"}
      />
      <FormHelperText>{t("translations.helperText")}</FormHelperText>
    </Box>
  );
};

export default UpdateTranslations;
