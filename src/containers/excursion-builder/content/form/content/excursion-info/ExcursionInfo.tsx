import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid2";
import { FormLabel, Typography } from "@mui/material";
import { SelectElement, TextFieldElement } from "react-hook-form-mui";
import TextEditor from "@/components/forms/text-editor/TextEditor";
import ExcursionRegion from "@/containers/excursion-builder/content/form/content/excursion-info/content/ExcursionRegion";

const ExcursionInfo = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography fontWeight={500} fontSize={"22px"} mb={"0.5em"}>
          {t("form.title")}
        </Typography>
        <TextFieldElement
          autoFocus
          name={"title"}
          required
          fullWidth
          placeholder={t("form.titlePlaceholder")}
          rules={{
            required: t("errors.required", {
              ns: "common",
            }),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ExcursionRegion />
      </Grid>
      <Grid size={12}>
        <Typography fontWeight={500} fontSize={"22px"} mb={"0.5em"}>
          {t("form.description")}
        </Typography>
        <TextEditor
          sx={{
            ".ql-container": {
              minHeight: { xs: "200px !important", md: "200px !important" },
            },
          }}
          required
          maxSymbols={2000}
          fieldName={"description"}
          placeholder={t("form.descriptionPlaceholder")}
        />
      </Grid>
    </Grid>
  );
};

export default ExcursionInfo;
