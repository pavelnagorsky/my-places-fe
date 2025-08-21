import { Box, Stack, Typography } from "@mui/material";
import { CheckboxButtonGroup, useFormContext } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";
import { useEffect } from "react";

const PlaceCategoriesSelect = ({
  readonly,
  categories,
}: {
  readonly?: boolean;
  categories: IPlaceCategory[];
}) => {
  const { t } = useTranslation(["place-management", "common"]);
  const { watch, setValue } = useFormContext<IPlaceFormContext>();
  const isCommercial = watch("isCommercial");

  useEffect(() => {
    if (isCommercial) {
      setValue("categoriesIds", []);
    }
  }, [isCommercial]);

  if (isCommercial) return null;
  return (
    <Stack>
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
          required
          parseError={() =>
            t("errors.required", {
              ns: "common",
            })
          }
          name={"categoriesIds"}
        />
      </Box>
    </Stack>
  );
};

export default PlaceCategoriesSelect;
