import { Stack, Typography } from "@mui/material";
import { SelectElement } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getRegionsThunk } from "@/store/excursion-builder-slice/thunks";
import { selectRegions } from "@/store/excursion-builder-slice/excursion-builder.slice";

const ExcursionRegion = () => {
  const { t, i18n } = useTranslation("excursion-management");
  const dispatch = useAppDispatch();
  const regions = useAppSelector(selectRegions);

  useEffect(() => {
    dispatch(getRegionsThunk({ language: i18n.language }));
  }, [i18n.language]);

  return (
    <Stack>
      <Typography fontWeight={500} fontSize={"22px"} mb={"0.5em"}>
        {t("form.region")}
      </Typography>
      <SelectElement
        slotProps={{
          select: {
            displayEmpty: true,
            renderValue: (value: unknown) => {
              if (!value) {
                return (
                  <Typography color="textDisabled">Укажите область</Typography>
                );
              }
              return <>{regions.find((r) => r.id === value)?.title}</>;
            },
          },
        }}
        placeholder={"ssss"}
        name={"regionId"}
        required
        fullWidth
        options={regions}
        labelKey={"title"}
        rules={{
          required: t("errors.required", {
            ns: "common",
          }),
        }}
      />
    </Stack>
  );
};

export default ExcursionRegion;
