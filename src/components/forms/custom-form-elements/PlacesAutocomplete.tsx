import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";
import { debounce } from "@mui/material";
import searchService from "@/services/search-service/search.service";
import { SearchOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { ISearchPlaceOption } from "@/services/search-service/interfaces/search-place-option.interface";

interface IPlacesAutocompleteProps {
  fieldName: string;
  readonly?: boolean;
  required?: boolean;
  excludeIds?: number[];
  pageSize?: number;
  orderBy?: SearchOrderByEnum;
}

const defaultPageSize = 20;
const defaultOrderBy = SearchOrderByEnum.TITLE;

const PlaceAutocomplete = ({
  fieldName,
  readonly,
  required,
  excludeIds,
  pageSize,
  orderBy,
}: IPlacesAutocompleteProps) => {
  const { t, i18n } = useTranslation(["review-management", "common"]);
  const [options, setOptions] = useState<ISearchPlaceOption[]>([]);
  const [loading, setLoading] = useState(false);

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
        setOptions(data.items);
        setLoading(false);
      })
      .catch(() => {
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
      parseError={(error) => t("errors.required", { ns: "common" })}
      name={fieldName}
      loading={loading}
      options={options}
      textFieldProps={{
        placeholder: t("form.selectPlace"),
        fullWidth: true,
        sx: {
          minWidth: { sm: "300px", md: "350px" },
          "& .MuiInputBase-root": { bgcolor: "white" },
        },
        onChange: debouncedInputChange,
      }}
      autocompleteProps={{
        readOnly: readonly,
      }}
    />
  );
};

export default memo(PlaceAutocomplete);
