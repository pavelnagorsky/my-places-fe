import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import TextEditor from "@/components/forms/text-editor/TextEditor";
import ExcursionRegion from "@/containers/excursion-builder/content/form/content/excursion-info/content/ExcursionRegion";
import ExcursionCitySelect from "@/containers/moderation/excursions/excursion-moderation/content/excursion-city-select/ExcursionCitySelect";
import useRoleAccess from "@/hooks/useRoleAccess";
import RolesEnum from "@/services/auth-service/enums/roles.enum";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";

const ExcursionInfo = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const isAdmin = useRoleAccess([RolesEnum.MODERATOR, RolesEnum.ADMIN]);
  const { watch } = useFormContext<IExcursionBuilderForm>();
  const type = watch("type");

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
      {isAdmin && +type === ExcursionTypesEnum.Overview && (
        <Grid size={{ xs: 12, md: 6 }}>
          <ExcursionCitySelect
            fieldName={"city"}
            sx={{
              "& .excursion-city-label": {
                fontWeight: 500,
                fontSize: "22px !important",
              },
            }}
          />
        </Grid>
      )}
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
