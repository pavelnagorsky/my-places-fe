import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";

interface ISearchPaginationProps {
  currentResultsCount: number;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onChangeCurrentPage: (page: number) => void;
}

const SearchPagination = ({
  totalPages,
  currentPage,
  totalResults,
  currentResultsCount,
  onChangeCurrentPage,
}: ISearchPaginationProps) => {
  const { t } = useTranslation("searchPage");
  const firstAndLastVisibleResults = useMemo(() => {
    const first = currentPage * placesService.SEARCH_PLACES_PER_PAGE + 1;
    const last = first + currentResultsCount - 1;
    return { first, last };
  }, [currentPage, currentResultsCount]);

  return totalResults > 0 ? (
    <Stack direction={"row"} justifyContent={"center"} mt={"3em"} mb={"6em"}>
      <Stack alignItems={"center"}>
        <Pagination
          sx={{
            borderColor: "black",
          }}
          page={currentPage + 1}
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={(event, page) => {
            if (page - 1 !== currentPage) {
              onChangeCurrentPage(page - 1);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
        />
        <Typography variant={"body1"} mt={"1em"} fontWeight={500}>
          <Box component={"span"} fontWeight={700}>
            {firstAndLastVisibleResults.first}-{firstAndLastVisibleResults.last}
          </Box>{" "}
          {t("pagination.of")}{" "}
          <Box component={"span"} fontWeight={700}>
            {totalResults}
          </Box>{" "}
          {t("pagination.results")}
        </Typography>
      </Stack>
    </Stack>
  ) : (
    <Box mb={"6em"} />
  );
};

export default SearchPagination;
