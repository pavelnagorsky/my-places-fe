import { Fragment, memo, useMemo } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  CheckboxButtonGroup,
  Controller,
  SelectElement,
  useFormContext,
} from "react-hook-form-mui";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import {
  IPlaceFormContext,
  IPlaceTabProps,
} from "@/containers/create-place/form/interfaces";
import { useTranslation } from "next-i18next";

interface ITab2Props extends IPlaceTabProps {
  placeTypes: IPlaceType[];
  categories: IPlaceCategory[];
}

const Tab2 = ({ placeTypes, categories, readonly }: ITab2Props) => {
  const { t } = useTranslation(["place-management", "common"]);
  const { watch, setValue } = useFormContext<IPlaceFormContext>();
  const isCommercial = watch("isCommercial");

  const filteredPlaceTypes = useMemo(() => {
    return placeTypes
      .filter((t) => {
        if (isCommercial) {
          return t.commercial;
        } else {
          return !t.commercial;
        }
      })
      .map((opt) => ({ id: opt.id, label: opt.title }));
  }, [isCommercial, placeTypes]);

  return (
    <Fragment>
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
          fontSize={{ xs: "20px", md: "30px" }}
          fontWeight={{ xs: 500, md: 400 }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          {t("tabs.2.formTitle")}
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={6000}
          sx={{ fontSize: "16px", alignSelf: "center" }}
          title={<Typography p={"0.5em"}>{t("tabs.2.tooltip")}</Typography>}
        >
          <IconButton>
            <InfoOutlinedIcon fontSize={"medium"} />
          </IconButton>
        </Tooltip>
      </Stack>
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
      <Typography variant={"body1"} fontSize={{ xs: "18px", md: "20px" }}>
        {t("tabs.2.placeType")}
      </Typography>
      <SelectElement
        name={"placeTypeId"}
        SelectProps={{
          readOnly: readonly,
        }}
        validation={{
          required: t("errors.required", {
            ns: "common",
          }),
        }}
        sx={{
          mt: "1em",
          width: { xs: "100%", md: "50%" },
        }}
        options={filteredPlaceTypes}
        placeholder={t("tabs.2.placeTypePlaceholder")}
      />
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        {t("tabs.2.placeCategories")}
      </Typography>
      <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
        {t("tabs.2.placeCategoriesDescription")}
      </Typography>
      <Box
        width={"100%"}
        mt={"1em"}
        mb="3em"
        sx={{
          "& .MuiFormControl-root": {
            width: "100%",
          },
        }}
      >
        <CheckboxButtonGroup
          labelProps={{
            disabled: readonly,
            sx: {
              wordBreak: "break-word",
              width: { xs: "49%", md: "40%", lg: "35%" },
              mx: 0,
              marginInlineEnd: "2px",
              "& span:first-of-type": {
                color: "primary.light",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              },
            },
          }}
          row
          options={categories.map((opt) => ({
            id: opt.id,
            label: opt.title,
          }))}
          required={true}
          parseError={() =>
            t("errors.required", {
              ns: "common",
            })
          }
          name={"categoriesIds"}
        />
      </Box>
    </Fragment>
  );
};

export default memo(Tab2);
