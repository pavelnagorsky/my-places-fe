import { Fragment, memo, useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Slider,
  Stack,
  SxProps,
} from "@mui/material";
import {
  CheckboxElement,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import { ISearchForm } from "@/hoc/WithSearch";
import { useTranslation } from "next-i18next";

interface IRadiusFilterProps {
  searchByMeSx?: SxProps;
}

const RadiusFilter = ({ searchByMeSx }: IRadiusFilterProps) => {
  const { t } = useTranslation("searchPage");
  const [loading, setLoading] = useState(false);
  const form = useFormContext<ISearchForm>();

  const radius = form.watch("radius");

  const onSearchByMe = (event: any, checked: boolean) => {
    if (!checked) {
      form.setValue("searchByMe", false);
      form.setValue("search", null);
      return;
    }
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI) {
      console.log("geolocation not available");
      form.setValue("searchByMe", false);
      return;
    }
    setLoading(true);
    geolocationAPI.getCurrentPosition(
      ({ coords }) => {
        form.setValue("search", `${coords.latitude};${coords.longitude}`);
        form.setValue("searchByMe", true);
        setLoading(false);
      },
      (error) => {
        console.log(error.message);
        form.setValue("searchByMe", false);
        setLoading(false);
      }
    );
  };

  function valueText(value: number) {
    return `${value} ${t("filters.km")}`;
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") form.setValue("radius", newValue);
  };

  return (
    <Fragment>
      <Stack
        direction={"row"}
        gap={"1em"}
        mb={"0.5em"}
        alignItems={"flex-start"}
      >
        <Box sx={{ width: "100%" }}>
          <Slider
            value={typeof radius === "number" ? radius : 0}
            onChange={handleSliderChange}
            aria-label="search-distance"
            getAriaValueText={valueText}
            step={10}
            max={200}
            valueLabelDisplay="auto"
          />
        </Box>
        <TextFieldElement
          type={"number"}
          name={"radius"}
          variant={"standard"}
          sx={{
            maxWidth: "5em",
          }}
          InputProps={{
            size: "small",
            endAdornment: (
              <InputAdornment position="end">{t("filters.km")}</InputAdornment>
            ),
          }}
          onChange={(event) => {
            const isNumber =
              event.target.value.length > 0 &&
              typeof +event.target.value === "number";
            form.setValue("radius", isNumber ? +event.target.value : 1);
          }}
          inputProps={{
            inputMode: "numeric",
            step: 10,
            max: 200,
            "aria-labelledby": "search-distance",
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"start"}
        sx={{ "& label": { ml: 0 }, ...searchByMeSx }}
      >
        <CheckboxElement
          onChange={onSearchByMe}
          sx={{ color: "primary.light" }}
          inputProps={{ "aria-label": "Search by me enabled" }}
          name={"searchByMe"}
          label={
            loading ? <CircularProgress size={30} /> : t("filters.searchByMe")
          }
        />
      </Stack>
    </Fragment>
  );
};

export default memo(RadiusFilter);
