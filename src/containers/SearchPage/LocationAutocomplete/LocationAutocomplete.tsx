import {
  Box,
  debounce,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";
import parse from "autosuggest-highlight/parse";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  defaultCountrySign,
  ILatLngCoordinate,
} from "../../../components/Map/Map";
import { useGoogleAutocompleteService } from "@/hooks/useGoogleAutocompleteService";
import { useTranslation } from "next-i18next";
import { useCoordinatesByPlaceId } from "@/hooks/useCoordinatesByPlaceId";
import SearchIcon from "@mui/icons-material/Search";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/containers/SearchPage/Filters/FormContainer";
import utils from "@/shared/utils";

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  place_id: string;
  structured_formatting: StructuredFormatting;
}

export function LocationAutocomplete() {
  const { t } = useTranslation("searchPage");
  const [inputValue, setInputValue] = useState("");
  //const [value, setValue] = useState<PlaceType | null>(null);
  const [selected, setSelected] = useState(false);
  const autocompleteService = useGoogleAutocompleteService();
  const searchCoordinates = useCoordinatesByPlaceId();
  const form = useFormContext<ISearchForm>();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelected(false);
  };

  const onSelect = (option: PlaceType) => {
    setInputValue(option.structured_formatting.main_text);
    setSelected(true);
    searchCoordinates(option.place_id)
      .then((latLng) => {
        form.setValue("search", utils.latLngToString(latLng as any));
      })
      .catch(() => {
        setInputValue("");
        form.setValue("search", null);
      });
  };

  const [options, setOptions] = useState<readonly PlaceType[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: google.maps.places.AutocompletionRequest,
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService as any)?.getPlacePredictions(request, callback);
        },
        300
      ),
    [autocompleteService !== null]
  );

  useEffect(() => {
    let active = true;

    if (selected) {
      setOptions([]);
      return;
    }

    if (!autocompleteService) {
      return;
    }

    if (inputValue === "") {
      form.setValue("search", null);
      setOptions([]);
      return;
    }

    fetch(
      {
        input: inputValue,
        componentRestrictions: { country: defaultCountrySign },
      },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];
          if (results) {
            newOptions = [...results];
          }
          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [selected, inputValue, fetch]);

  return (
    <Box>
      <TextField
        fullWidth
        placeholder={t("filters.autocomplete")}
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <SearchIcon color={"primary"} />
            </InputAdornment>
          ),
        }}
        aria-label="Search for a place on the map"
        aria-haspopup={true}
        aria-autocomplete={"list"}
        aria-controls="place-predictions"
        type={"search"}
        role={"combobox"}
        aria-expanded={options.length > 0}
        id="google-map-autocomplete"
        value={inputValue}
        onChange={onInputChange}
      />
      <MenuList
        id={"place-predictions"}
        role="listbox"
        aria-label="Autocomplete suggestions"
      >
        {options.map((option, index) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );
          return (
            <MenuItem
              role={"option"}
              id={`${index}`}
              key={index}
              sx={{ width: "100%" }}
              onClick={() => onSelect(option)}
            >
              <ListItemIcon>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary" mt={"0.1em"}>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </ListItemText>
            </MenuItem>
          );
        })}
      </MenuList>
    </Box>
  );
}
