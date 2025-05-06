import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import {
  selectNoItems,
  selectTotalItems,
  selectSearchFiltersLoading,
} from "@/store/excursions-slice/excursions.selectors";
import { useAppSelector } from "@/store/hooks";

const TotalResultsCount = () => {
  const { t } = useTranslation("excursion-management");
  // info about search request
  const noItems = useAppSelector(selectNoItems);
  const totalItems = useAppSelector(selectTotalItems);
  const searchLoading = useAppSelector(selectSearchFiltersLoading);

  return (
    <Typography
      fontSize={{ xs: "18px", md: "20px" }}
      fontWeight={700}
      component={"h1"}
    >
      {noItems
        ? t("search.noResults")
        : t("search.excursionsFound", {
            value: searchLoading ? "" : totalItems ?? 0,
          })}
    </Typography>
  );
};

export default TotalResultsCount;
