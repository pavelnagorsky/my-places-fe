import { useTranslation } from "next-i18next";
import { Box, InputAdornment } from "@mui/material";
import { SelectElement } from "react-hook-form-mui";
import { primaryBackground } from "@/styles/theme/lightTheme";
import useSearchOrderByOptions from "@/containers/excursions/content/order-by-selector/logic/useSearchOrderByOptions";

const OrderBySelector = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation("excursion-management");
  const options = useSearchOrderByOptions();

  return (
    <Box
      width={"fit-content"}
      px={"1em"}
      py={"0.3em"}
      borderRadius={"100px"}
      bgcolor={primaryBackground}
    >
      <SelectElement
        onChange={onSubmit}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position={"start"} sx={{ color: "primary.main" }}>
                {t("search.filters.orderBy.title")}:
              </InputAdornment>
            ),
          },
          select: {
            disableUnderline: true,
            sx: { color: "primary.main", "& svg": { color: "primary.main" } },
          },
        }}
        variant={"standard"}
        color={"primary"}
        name="orderBy"
        options={options}
      />
    </Box>
  );
};

export default OrderBySelector;
