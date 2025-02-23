import { debounce, TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGoogleAutocompleteService } from "@/hooks/useGoogleAutocompleteService";
import { useTranslation } from "next-i18next";
import { useCoordinatesByPlaceId } from "@/hooks/useCoordinatesByPlaceId";
import {
  AutocompleteElement,
  RegisterOptions,
  useFormContext,
} from "react-hook-form-mui";
import LocationOption from "@/containers/search-page/content/filters/content/location-search/content/location-autocomplete/LocationOption";
import utils from "@/shared/utils";
import { defaultCountrySign } from "@/components/map/config";

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: MainTextMatchedSubstrings[];
}
export interface IPlaceType {
  description: string;
  place_id: string;
  structured_formatting: StructuredFormatting;
}
export interface IPlaceTypeWithCoordinates extends IPlaceType {
  coordinates: string;
}

interface ILocationAutocompleteProps {
  fieldName: string;
  fieldNameCoordinates: string;
  textFieldProps?: Partial<TextFieldProps>;
  disabled?: boolean;
  rules?: RegisterOptions;
  required?: boolean;
}

function LocationAutocomplete({
  fieldName,
  fieldNameCoordinates,
  disabled,
  textFieldProps,
  rules,
  required,
}: ILocationAutocompleteProps) {
  const { t, i18n } = useTranslation("common");
  const { autocompleteService, isInitialized } = useGoogleAutocompleteService();
  const searchCoordinates = useCoordinatesByPlaceId();
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const value: IPlaceTypeWithCoordinates | null = watch(fieldName);
  const [options, setOptions] = useState<IPlaceType[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: google.maps.places.AutocompletionRequest,
          callback: (results?: IPlaceType[]) => void
        ) => {
          (autocompleteService as any)?.getPlacePredictions(request, callback);
        },
        300
      ),
    [autocompleteService]
  );

  useEffect(() => {
    if (!autocompleteService) {
      return;
    }

    // if (inputValue === "") {
    //   setOptions(value ? [value] : []);
    //    return;
    // }

    fetch(
      {
        input: inputValue || t("filters.defaultLocationSearch"),
        language: i18n.language,
        componentRestrictions: { country: defaultCountrySign },
      },
      (results?: readonly IPlaceType[]) => {
        let newOptions: IPlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    );
  }, [value, inputValue, fetch, isInitialized, i18n.language]);

  return (
    <AutocompleteElement
      required={required}
      name={fieldName}
      label={textFieldProps?.label}
      options={options}
      rules={rules}
      textFieldProps={{
        ...textFieldProps,
        placeholder: textFieldProps?.placeholder || t("filters.enterLocation"),
        onChange: (event) => {
          setInputValue(event.target.value);
        },
      }}
      autocompleteProps={{
        disabled,
        autoComplete: true,
        includeInputInList: true,
        filterSelectedOptions: true,
        isOptionEqualToValue: (option, val) => {
          return option.place_id === val?.place_id;
        },
        getOptionLabel: (option) =>
          typeof option === "string" ? option : option.description,
        getOptionKey: (opt) => opt.place_id + opt.description,
        onChange: async (event: any, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          if (!newValue) {
            setValue(fieldNameCoordinates, null);
          } else {
            try {
              const latLng = await searchCoordinates(newValue.place_id);
              const coordinates = utils.latLngToString(latLng as any);
              setValue(fieldNameCoordinates, coordinates);
            } catch (e) {
              setValue(fieldNameCoordinates, null);
            }
          }
        },
        "aria-label": "Autocomplete suggestions",
        renderOption: LocationOption,
      }}
    />
  );
}

export default LocationAutocomplete;
