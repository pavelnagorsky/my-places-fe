import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import { Stack, Typography } from "@mui/material";
import useLanguages from "@/hooks/useLanguages";
import { ICityFormContext } from "@/containers/admin/cities/city/interfaces";

const BasicInfoTab = () => {
  const methods = useFormContext<ICityFormContext>();
  const { watch, setValue } = methods;
  const languages = useLanguages();
  const names = watch("titleTranslations");

  return (
    <Stack gap={"1em"}>
      <Stack>
        <Typography variant="h6" mb="1.5em">
          Название города
        </Typography>
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
              parseError={() => "Это поле обязательно к заполнению"}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicInfoTab;
