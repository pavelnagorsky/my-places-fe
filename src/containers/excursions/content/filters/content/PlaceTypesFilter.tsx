import { Box, Stack, SxProps, Typography } from "@mui/material";
import { CheckboxButtonGroup } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store/hooks";
import { selectPlaceTypes } from "@/store/excursions-slice/excursions.selectors";

const PlaceTypesFilter = () => {
  const { t } = useTranslation("excursion-management");
  const types = useAppSelector(selectPlaceTypes);

  return (
    <Stack>
      <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
        {t("search.filters.placeTypes")}
      </Typography>
      <CheckboxButtonGroup
        labelProps={{
          sx: {
            width: "49%",
            wordBreak: "break-word",
            wordWrap: "break-word",
            hyphens: "auto",
            overflow: "hidden",
            mx: 0,
            marginInlineEnd: "0.5px",
          },
        }}
        row
        options={types.map((type) => ({ id: type.id, label: type.title }))}
        name={"placeTypeIds"}
      />
    </Stack>
  );
};

export default PlaceTypesFilter;
