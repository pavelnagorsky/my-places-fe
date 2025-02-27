import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";
import { RadioButtonGroup } from "react-hook-form-mui";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";

const ExcursionType = () => {
  const { t } = useTranslation("excursion-management");
  const travelModeOptions = useTravelModeOptions();
  const typeOptions = useExcursionTypes();
  return (
    <Stack gap={"1em"}>
      <Stack>
        <Typography fontWeight={500} fontSize={"22px"} gutterBottom>
          Тип экскурсии
        </Typography>
        <RadioButtonGroup
          name="type"
          row
          options={typeOptions.map((type) => ({
            id: `${type.id}`,
            label: type.label,
          }))}
          required
        />
      </Stack>
      <Stack>
        <Typography fontWeight={500} fontSize={"22px"} gutterBottom>
          Категория экскурсии
        </Typography>
        <RadioButtonGroup
          name="travelMode"
          row
          options={travelModeOptions}
          required
        />
      </Stack>
    </Stack>
  );
};

export default ExcursionType;
