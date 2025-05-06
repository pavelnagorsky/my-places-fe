import { Stack, SxProps, useMediaQuery, useTheme } from "@mui/material";
import PlaceCardSkeleton from "@/containers/search-page/content/cards-section/place-card/PlaceCardSkeleton";

export const searchResultsGridSx: SxProps = {
  width: {
    xs: "340px",
    // sm: "700px",
    md: "850px",
    xl: "1296px",
  },
  flexWrap: "wrap",
  flexDirection: { xs: "column", sm: "row" },
  rowGap: { xs: "2em", md: "3em" },
  columnGap: { xs: "0em", sm: "2em", md: "3em", xl: "3em" },
};

const SearchResultsLoader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("xl"));
  const placeholdersArray = isMobile ? [1] : isLaptop ? [1, 2] : [1, 2, 3];

  return (
    <Stack sx={searchResultsGridSx} my={"2em"}>
      {placeholdersArray.map((place, index) => (
        <PlaceCardSkeleton key={index} />
      ))}
    </Stack>
  );
};

export default SearchResultsLoader;
