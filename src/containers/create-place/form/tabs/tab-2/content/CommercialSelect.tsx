import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Controller, SwitchElement, useFormContext } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";

const CommercialSelect = ({ readonly }: { readonly?: boolean }) => {
  const { t } = useTranslation(["place-management", "common"]);
  const { setValue } = useFormContext<IPlaceFormContext>();

  return (
    <Stack mb={"1.5em"} mt={"0.5em"} maxWidth={{ lg: "70%" }}>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ sm: "center" }}
        gap={{ xs: "0.4em", sm: "1em" }}
      >
        <Typography variant={"body1"} fontSize={{ xs: "18px", md: "20px" }}>
          {t("tabs.2.commercial")}
        </Typography>
        <Controller
          name={"isCommercial"}
          render={({ field, fieldState, formState }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked={!!field.value}
                  disabled={readonly}
                  onChange={(event, checked) => {
                    setValue("placeTypeId", "" as any);
                    field.onChange(checked);
                  }}
                />
              }
              label={
                <Box component={"span"} display={{ sm: "none" }}>
                  {t("tabs.2.commercialLabel")}
                </Box>
              }
            />
          )}
        />
      </Stack>
      <Typography
        variant={"body2"}
        mt={"0.5em"}
        fontSize={{ xs: "12px", md: "14px" }}
      >
        {t("tabs.2.commercialHelper")}
      </Typography>
    </Stack>
  );
};

export default CommercialSelect;
