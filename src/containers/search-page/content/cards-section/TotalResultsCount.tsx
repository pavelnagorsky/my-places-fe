import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import {
  selectNoItems,
  selectTotalItems,
} from "@/store/search-slice/search.slice";
import { useAppSelector } from "@/store/hooks";

const TotalResultsCount = () => {
  const { t } = useTranslation("search");
  // info about search request
  const noItems = useAppSelector(selectNoItems);
  const totalItems = useAppSelector(selectTotalItems);

  return (
    <Typography fontSize={"20px"} fontWeight={700} component={"h1"}>
      {noItems ? t("noResults") : `${t("placesFound")}: ${totalItems || ""}`}
    </Typography>
  );
};

export default TotalResultsCount;
