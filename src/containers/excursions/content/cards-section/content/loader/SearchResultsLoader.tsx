import { Stack, SxProps, useMediaQuery, useTheme } from "@mui/material";
import ExcursionCardSkeleton from "@/containers/excursions/content/cards-section/content/excursion-card/content/ExcursionCardSkeleton";

export const searchResultsGridSx: SxProps = {
  width: {
    xs: "340px",
    // sm: "700px",
    md: "850px",
    lg: "1232px",
    xl: "1296px",
  },
  flexWrap: "wrap",
  flexDirection: { xs: "column", sm: "row" },
  rowGap: { xs: "2em", md: "3em", lg: "1em", xl: "3em" },
  columnGap: { xs: "0em", sm: "2em", md: "3em", lg: "1em", xl: "3em" },
};

const SearchResultsLoader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const placeholdersArray = isMobile ? [1] : isLaptop ? [1, 2] : [1, 2, 3];

  return (
    <Stack sx={searchResultsGridSx} my={"1em"}>
      {placeholdersArray.map((excursion, index) => (
        <ExcursionCardSkeleton key={index} />
      ))}
    </Stack>
  );
};

export default SearchResultsLoader;
