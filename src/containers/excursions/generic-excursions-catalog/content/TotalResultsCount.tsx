import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";

const TotalResultsCount = ({ itemsCount }: { itemsCount: number }) => {
  const { t } = useTranslation("excursion-management");
  // info about search request
  const noItems = !itemsCount;

  return (
    <Typography fontSize={{ xs: "18px", md: "20px" }} fontWeight={700}>
      {noItems
        ? t("search.noResults")
        : t("search.excursionsFound", {
            value: itemsCount,
          })}
    </Typography>
  );
};

export default TotalResultsCount;
