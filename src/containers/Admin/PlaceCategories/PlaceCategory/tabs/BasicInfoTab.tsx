import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import { Grid, Stack, Typography } from "@mui/material";
import { IPlaceCategoryFormContext } from "@/containers/Admin/PlaceCategories/PlaceCategory/interfaces";
import useLanguages from "@/hooks/useLanguages";
import SingleImageUploader from "@/components/Forms/ImageUploader/SingleImageUploader";

const BasicInfoTab = () => {
  const methods = useFormContext<IPlaceCategoryFormContext>();
  const { watch, setValue } = methods;
  const languages = useLanguages();
  const names = watch("titleTranslations");

  return (
    <Stack gap={"1em"}>
      <Stack>
        <Typography variant="h6" mb="1.5em">
          Название категории
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
              validation={{ required: true }}
              parseError={() => "Это поле обязательно к заполнению"}
            />
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={"1em"} mb={"2em"}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb="1em">
            Иконка
          </Typography>
          <SingleImageUploader
            notRequired
            fieldName="image"
            placeholder="Иконка"
            onDelete={(fieldName) => setValue("image", null)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb="1em">
            Иконка цветная
          </Typography>
          <SingleImageUploader
            notRequired
            fieldName="image2"
            placeholder="Иконка цветная"
            onDelete={(fieldName) => setValue("image2", null)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BasicInfoTab;
