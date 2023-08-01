import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { debounce } from "@mui/material";
import ISelectPlace from "@/services/places-service/select-place.interface";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";
import { AutocompleteElement } from "react-hook-form-mui";

interface IPlaceSelectProps {
  readonly fieldName: string;
}

const PlaceSelect = ({ fieldName }: IPlaceSelectProps) => {
  const { i18n } = useTranslation();
  const [options, setOptions] = useState<ISelectPlace[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = (value: string) =>
    placesService
      .getPlacesSelect(i18n.language, value)
      .then(({ data }) => {
        setOptions(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  useEffect(() => {
    fetch("");
  }, [i18n.language]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    fetch(event.target.value);
  };

  const debouncedInputChange = useMemo(
    () => debounce(onInputChange, 300),
    [onInputChange]
  );

  return (
    <AutocompleteElement
      rules={{
        required: true,
        minLength: 15,
      }}
      parseError={(error) => "Поле обязательно к заполнению"}
      name={fieldName}
      loading={loading}
      options={options}
      textFieldProps={{
        placeholder: "Выберите место",
        fullWidth: true,
        sx: {
          minWidth: "280px",
          "& .MuiInputBase-root": { bgcolor: "white" },
        },
        onChange: debouncedInputChange,
      }}
      autocompleteProps={{
        getOptionLabel: (opt) => opt.title,
        filterOptions: (x) => x,
      }}
    />
  );
};

export default memo(PlaceSelect);
