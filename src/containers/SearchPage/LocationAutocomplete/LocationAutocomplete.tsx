import {
  Autocomplete,
  Box,
  debounce,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";
import parse from "autosuggest-highlight/parse";
import { useEffect, useMemo, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { defaultCountrySign } from "../../../components/Map/Map";
import { useGoogleAutocompleteService } from "@/hooks/useGoogleAutocompleteService";
import { useTranslation } from "next-i18next";

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

interface ILocationAutoSelectProps {
  onSetPlaceId: (id: string) => void;
  readonly value: PlaceType | null;
  setValue: (value: PlaceType | null) => void;
}

export function LocationAutocomplete({
  onSetPlaceId,
  setValue,
  value,
}: ILocationAutoSelectProps) {
  const { t } = useTranslation("searchPage");
  const [inputValue, setInputValue] = useState("");
  const autocompleteService = useGoogleAutocompleteService();

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
    if (value?.place_id) {
      onSetPlaceId(value.place_id);
    }

    if (!autocompleteService) {
      return;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
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

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Box>
      <TextField
        id="google-map-autocomplete"
        sx={{ width: 300 }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <MenuList sx={{ width: 300 }}>
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
              key={index}
              sx={{ width: "100%" }}
              onClick={() =>
                setInputValue(option.structured_formatting.main_text)
              }
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

  return (
    <Autocomplete
      id="google-map-autocomplete"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={t("filters.autocomplete")} fullWidth />
      )}
      renderOption={(props, option) => {
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
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
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
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
