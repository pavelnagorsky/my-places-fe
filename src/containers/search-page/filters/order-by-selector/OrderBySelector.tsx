import useSearchOrderByOptions from "@/containers/search-page/filters/order-by-selector/useSearchOrderByOptions";
import { useTranslation } from "next-i18next";
import { Box, Typography } from "@mui/material";
import { ToggleButtonGroupElement } from "react-hook-form-mui";

const OrderBySelector = () => {
  const { t } = useTranslation("search");
  const options = useSearchOrderByOptions();

  return (
    <Box mb={"1em"}>
      <Typography fontSize={"18px"} component={"p"} mb={"0.8em"}>
        {t("filters.orderBy.title")}
      </Typography>
      <ToggleButtonGroupElement
        sx={{ "& button": { fontSize: "16px", textTransform: "none" } }}
        exclusive
        color={"primary"}
        enforceAtLeastOneSelected
        name="orderBy"
        options={options}
      />
    </Box>
  );
};

export default OrderBySelector;
