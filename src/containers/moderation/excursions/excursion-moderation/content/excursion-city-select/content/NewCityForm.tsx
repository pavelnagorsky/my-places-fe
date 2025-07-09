import useLanguages from "@/hooks/useLanguages";
import { FormControl, FormLabel, Stack, Typography } from "@mui/material";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { ICityFormContext } from "@/containers/admin/cities/city/interfaces";

const NewCityForm = () => {
  const languages = useLanguages();
  const { t } = useTranslation(["excursion-management", "common"]);
  const methods = useFormContext<ICityFormContext>();
  const { watch, setValue } = methods;
  const names = watch("titleTranslations");

  return (
    <Stack>
      <FormControl>
        <FormLabel sx={{ mb: 1.5 }}>{t("form.cityTitle")}</FormLabel>
        <Stack direction={{ md: "row" }} gap={{ xs: "1.5em", md: "1em" }}>
          {names.map((n, i) => (
            <TextFieldElement
              key={i}
              label={languages.find((l) => l.id === n.langId)?.label || "Язык"}
              name={`titleTranslations.${i}.text`}
              required
              variant="outlined"
              fullWidth
              rules={{ required: true }}
              parseError={() => t("errors.required", { ns: "common" })}
            />
          ))}
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default NewCityForm;
