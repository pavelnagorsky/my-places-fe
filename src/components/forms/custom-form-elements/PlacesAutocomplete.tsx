import { useTranslation } from "next-i18next";
import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { debounce } from "@mui/material";
import searchService from "@/services/search-service/search.service";
import { SearchPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { ISearchPlaceOption } from "@/services/search-service/interfaces/search-place-option.interface";

interface IPlacesAutocompleteProps {
  fieldName: string;
  multiple?: boolean;
  readonly?: boolean;
  required?: boolean;
  excludeIds?: number[];
  pageSize?: number;
  orderBy?: SearchPlacesOrderByEnum;
}

const defaultPageSize = 20;
const defaultOrderBy = SearchPlacesOrderByEnum.TITLE;

const PlaceAutocomplete = ({
  fieldName,
  readonly,
  required,
  excludeIds,
  pageSize,
  orderBy,
  multiple,
}: IPlacesAutocompleteProps) => {
  const { t, i18n } = useTranslation("common");
  const [options, setOptions] = useState<ISearchPlaceOption[]>([]);
  const [loading, setLoading] = useState(false);
  const { getValues } = useFormContext();

  const fetch = (value: string) =>
    searchService
      .searchPlaceOptions(
        {
          pageSize: pageSize || defaultPageSize,
          page: 0,
          search: value,
          orderBy: orderBy || defaultOrderBy,
          excludeIds: excludeIds,
        },
        i18n.language
      )
      .then(({ data }) => {
        const selectedValue = getValues(fieldName) as
          | ISearchPlaceOption
          | ISearchPlaceOption[];
        const selectedOptions = Array.isArray(selectedValue)
          ? selectedValue
          : selectedValue
          ? [selectedValue]
          : [];
        // Filter out duplicated keys
        const uniqueOptions = selectedOptions.filter(
          (option) =>
            !data.items.some((newOption) => option.id === newOption.id)
        );
        // Update options state
        setOptions([...data.items, ...uniqueOptions]);
        //setOptions(data.items);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });

  useEffect(() => {
    fetch("");
  }, [i18n.language]);

  const onInputChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        fetch(event.target.value);
      }, 300),
    [i18n.language]
  );

  const debouncedInputChange = debounce(onInputChange, 300);

  return (
    <AutocompleteElement
      rules={{
        required: required,
      }}
      label={multiple ? t("filters.selectPlaces") : t("filters.selectPlace")}
      multiple={multiple}
      parseError={(error) => t("errors.required")}
      name={fieldName}
      loading={loading}
      options={options}
      textFieldProps={{
        placeholder: t("filters.enterLocation"),
        fullWidth: true,
        sx: {
          minWidth: { sm: "300px", md: "350px" },
          "& .MuiInputBase-root": { bgcolor: "white" },
        },
        onChange: debouncedInputChange,
      }}
      autocompleteProps={{
        readOnly: readonly,
        freeSolo: true,
        filterSelectedOptions: true,
        filterOptions: (x) => x,
        autoComplete: true,
      }}
    />
  );
};

export default memo(PlaceAutocomplete);
