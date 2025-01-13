import { CheckboxElement, useFormContext } from "react-hook-form-mui";
import { CircularProgress, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { ISearchForm } from "@/containers/search-page/logic/interfaces";

interface ISearchByMeProps {
  fieldNameCoordinates: string;
  fieldName: string;
}

const SearchByMe = ({ fieldName, fieldNameCoordinates }: ISearchByMeProps) => {
  const { t } = useTranslation("search");
  const [loading, setLoading] = useState(false);
  const { setValue, getValues } = useFormContext();
  const oldSearchCoordinatesRef = useRef<string | null>(null);

  const onSearchByMe = (event: any, checked: boolean) => {
    if (!checked) {
      setLoading(false);
      setValue(fieldName, false);
      if (oldSearchCoordinatesRef.current) {
        setValue(fieldNameCoordinates, oldSearchCoordinatesRef.current);
      } else {
        setValue(fieldNameCoordinates, null);
      }
      return;
    }
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI) {
      console.error("geolocation not available");
      setValue(fieldName, false);
      return;
    }
    setLoading(true);
    geolocationAPI.getCurrentPosition(
      ({ coords }) => {
        oldSearchCoordinatesRef.current = getValues(fieldNameCoordinates);
        setValue(
          fieldNameCoordinates,
          `${coords.latitude};${coords.longitude}`
        );
        setValue(fieldName, true);
        setLoading(false);
      },
      (error) => {
        console.log(error.message);
        setValue(fieldName, false);
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
        name={fieldName}
        label={
          loading ? <CircularProgress size={20} /> : t("filters.searchByMe")
        }
      />
    </Stack>
  );
};

export default SearchByMe;
