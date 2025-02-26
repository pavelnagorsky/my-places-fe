import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid2";
import { FormLabel } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";
import TextEditor from "@/components/forms/text-editor/TextEditor";

const ExcursionInfo = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <FormLabel htmlFor={"title"}>Название</FormLabel>
        <TextFieldElement
          name={"title"}
          required
          rules={{
            required: t("errors.required", {
              ns: "common",
            }),
          }}
        />
      </Grid>
      <Grid size={12}>
        <FormLabel htmlFor={"description"}>Краткое описание</FormLabel>
        <TextEditor
          required
          maxSymbols={2000}
          fieldName={"description"}
          placeholder={"Введите описание экскурсии"}
        />
      </Grid>
    </Grid>
  );
};

export default ExcursionInfo;
