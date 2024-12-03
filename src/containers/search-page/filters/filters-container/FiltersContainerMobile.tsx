import Box from "@mui/material/Box";
import { SwitchElement } from "react-hook-form-mui";
import { Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import FiltersPopup from "@/containers/search-page/filters/filters-container/mobile/filters-popup";

const FiltersContainerMobile = ({
  triggerSubmit,
}: {
  triggerSubmit: () => void;
}) => {
  const { t } = useTranslation("search");

  return (
    <Stack py={"1.6em"} direction={"row"} gap={"1em"} alignItems={"center"}>
      <Box flexGrow={1}>
        <FiltersPopup triggerSubmit={triggerSubmit} />
      </Box>
      <SwitchElement
        label={t("filters.map")}
        name={"showMap"}
        labelPlacement={"top"}
      />
    </Stack>
  );
};

export default FiltersContainerMobile;
