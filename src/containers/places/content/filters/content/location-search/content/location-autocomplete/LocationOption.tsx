import { HTMLAttributes } from "react";
import parse from "autosuggest-highlight/parse";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Typography } from "@mui/material";
import { IPlaceType } from "@/containers/places/content/filters/content/location-search/content/location-autocomplete/LocationAutocomplete";

const LocationOption = (
  props: HTMLAttributes<HTMLLIElement> & { key: any },
  option: IPlaceType
) => {
  const { key, ...optionProps } = props;
  const matches =
    option.structured_formatting.main_text_matched_substrings || [];

  const parts = parse(
    option.structured_formatting.main_text,
    matches.map((match: any) => [match.offset, match.offset + match.length])
  );

  return (
    <li key={key} {...optionProps}>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid sx={{ display: "flex", width: 44 }}>
          <LocationOnIcon sx={{ color: "text.secondary" }} />
        </Grid>
        <Grid sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
          {parts.map((part, index) => (
            <Box
              key={index}
              component="span"
              sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
            >
              {part.text}
            </Box>
          ))}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {option.structured_formatting.secondary_text}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
};

export default LocationOption;
