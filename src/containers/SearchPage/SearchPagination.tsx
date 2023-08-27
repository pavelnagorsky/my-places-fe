import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentPage } from "@/store/search-results-slice/search-results.slice";
import { useMemo } from "react";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";

interface ISearchPaginationProps {
  currentResultsCount: number;
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

const SearchPagination = ({
  totalPages,
  currentPage,
  totalResults,
  currentResultsCount,
}: ISearchPaginationProps) => {
  const { t } = useTranslation("searchPage");
  const dispatch = useAppDispatch();
  const firstAndLastVisibleResults = useMemo(() => {
    const first = (currentPage - 1) * placesService.ITEMS_PER_PAGE + 1;
    const last = first + currentResultsCount - 1;
    return { first, last };
  }, [currentPage, currentResultsCount]);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return totalResults > 0 ? (
    <Stack direction={"row"} justifyContent={"center"} mt={"3em"} mb={"6em"}>
      <Stack alignItems={"center"}>
        <Pagination
          sx={{
            borderColor: "black",
          }}
          page={currentPage}
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={(event, page) => {
            handleChangePage(page);
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
