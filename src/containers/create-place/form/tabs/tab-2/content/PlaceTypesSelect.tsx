import { Stack, Typography } from "@mui/material";
import { SelectElement, useFormContext } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";
import { useMemo } from "react";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";

const PlaceTypesSelect = ({
  readonly,
  placeTypes,
}: {
  readonly?: boolean;
  placeTypes: IPlaceType[];
}) => {
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
    <Stack>
      <Typography variant={"body1"} fontSize={{ xs: "18px", md: "20px" }}>
        {t("tabs.2.placeType")}
      </Typography>
      <SelectElement
        name={"placeTypeId"}
        SelectProps={{
          readOnly: readonly,
        }}
        rules={{
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
    </Stack>
  );
};

export default PlaceTypesSelect;
