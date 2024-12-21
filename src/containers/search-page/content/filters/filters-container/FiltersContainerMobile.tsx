import Box from "@mui/material/Box";
import { SwitchElement } from "react-hook-form-mui";
import { FormControlLabel, Stack, Switch } from "@mui/material";
import { useTranslation } from "next-i18next";
import FiltersPopup from "@/containers/search-page/content/filters/filters-container/mobile/filters-popup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectIsMapOpen, setMapOpen } from "@/store/search-slice/search.slice";

const FiltersContainerMobile = ({
  triggerSubmit,
}: {
  triggerSubmit: () => void;
}) => {
  const { t } = useTranslation("search");
  const dispatch = useDispatch();
  const isMapOpen = useAppSelector(selectIsMapOpen);

  const onToggleMap = () => {
    dispatch(setMapOpen(!isMapOpen));
  };

  return (
    <Stack py={"1.6em"} direction={"row"} gap={"1em"} alignItems={"center"}>
      <Box flexGrow={1}>
        <FiltersPopup triggerSubmit={triggerSubmit} />
      </Box>
      <FormControlLabel
        control={<Switch value={isMapOpen} onChange={onToggleMap} />}
        label={t("filters.map")}
        labelPlacement={"top"}
      />
    </Stack>
  );
};

export default FiltersContainerMobile;
