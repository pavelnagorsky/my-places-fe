import { useTranslation } from "next-i18next";
import {
  CheckboxElement,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import {
  ISearchForm,
  SearchModesEnum,
} from "@/containers/places/logic/interfaces";
import {
  Box,
  InputAdornment,
  Slider,
  Stack,
  styled,
  Typography,
} from "@mui/material";

const StyledTextFieldElement = styled(TextFieldElement)`
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const RadiusFilter = () => {
  const { t } = useTranslation(["search", "common"]);
  const { watch, setValue, getValues } = useFormContext<ISearchForm>();
  const radius = watch("radius");
  const selectedMode = watch("mode");

  const valueText = (value: number) => {
    return `${value} ${t("filters.km")}`;
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") setValue("radius", newValue);
  };

  return (
    <Box width={"100%"}>
      <Typography fontSize={"20px"} fontWeight={500} mb={"0.5em"}>
        {selectedMode === SearchModesEnum.ONE_LOCATION
          ? t("filters.locationSearch.radiusLabel")
          : t("filters.routeSearch.radiusLabel")}
      </Typography>
      <Stack direction={"row"} gap={"1em"} alignItems={"end"}>
        <Slider
          sx={{ flexGrow: 2 }}
          value={typeof radius === "number" ? radius : 0}
          onChange={handleSliderChange}
          aria-label="places-distance"
          getAriaValueText={valueText}
          step={10}
          max={200}
          min={10}
          valueLabelDisplay="auto"
        />
        <StyledTextFieldElement
          sx={{ flexGrow: 1, minWidth: "90px" }}
          type={"number"}
          name={"radius"}
          variant={"outlined"}
          onChange={(event) => {
            const isNumber =
              event.target.value.length > 0 &&
              typeof +event.target.value === "number";
            setValue("radius", isNumber ? +event.target.value : 1);
          }}
          slotProps={{
            input: {
              size: "small",
              endAdornment: (
                <InputAdornment position="end">
                  {t("filters.km")}
                </InputAdornment>
              ),
            },
            htmlInput: {
              inputMode: "numeric",
              step: 10,
              max: 200,
              min: 10,
              "aria-labelledby": "search-distance",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default RadiusFilter;
