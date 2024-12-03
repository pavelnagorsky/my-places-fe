import { CheckboxElement, useFormContext } from "react-hook-form-mui";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { ISearchForm } from "@/containers/search-page/interfaces";

const SearchByMe = () => {
  const { t } = useTranslation("search");
  const [loading, setLoading] = useState(false);
  const { setValue, getValues } = useFormContext<ISearchForm>();
  const oldSearchCoordinatesRef = useRef<string | null>(null);

  const onSearchByMe = (event: any, checked: boolean) => {
    if (!checked) {
      setLoading(false);
      setValue("searchByMe", false);
      if (oldSearchCoordinatesRef.current) {
        setValue("locationStartCoordinates", oldSearchCoordinatesRef.current);
      } else {
        setValue("locationStartCoordinates", null);
      }
      return;
    }
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI) {
      console.error("geolocation not available");
      setValue("searchByMe", false);
      return;
    }
    setLoading(true);
    geolocationAPI.getCurrentPosition(
      ({ coords }) => {
        oldSearchCoordinatesRef.current = getValues("locationStartCoordinates");
        setValue(
          "locationStartCoordinates",
          `${coords.latitude};${coords.longitude}`
        );
        setValue("searchByMe", true);
        setLoading(false);
      },
      (error) => {
        console.log(error.message);
        setValue("searchByMe", false);
        setLoading(false);
      }
    );
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"start"}
      sx={{ "& label": { ml: 0 } }}
    >
      <CheckboxElement
        onChange={onSearchByMe}
        sx={{ color: "primary.light" }}
        inputProps={{ "aria-label": "Search by me enabled" }}
        name={"searchByMe"}
        label={
          loading ? <CircularProgress size={20} /> : t("filters.searchByMe")
        }
      />
    </Stack>
  );
};

export default SearchByMe;
