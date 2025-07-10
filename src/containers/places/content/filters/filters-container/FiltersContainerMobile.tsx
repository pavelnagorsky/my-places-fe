import Box from "@mui/material/Box";
import {
  FormControlLabel,
  Stack,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import FiltersPopup from "@/containers/places/content/filters/filters-container/mobile/filters-popup";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectIsMapOpen, setMapOpen } from "@/store/search-slice/search.slice";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import TextFilter from "@/containers/places/content/filters/content/TextFilter";

const FiltersContainerMobile = ({
  triggerSubmit,
}: {
  triggerSubmit: () => void;
}) => {
  const { t } = useTranslation("search");
  const dispatch = useDispatch();
  const isMapOpen = useAppSelector(selectIsMapOpen);
  const sendAnalytics = useAnalytics();
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onToggleMap = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: `${isMapOpen ? "close" : "open"} places search map on mobile`,
    });
    dispatch(setMapOpen(!isMapOpen));
  };

  return (
    <Stack py={"1.6em"} gap={"1em"}>
      <Stack direction={"row"} gap={"1em"} alignItems={"center"}>
        <Box flexGrow={{ xs: 1, md: 0 }}>
          <FiltersPopup triggerSubmit={triggerSubmit} />
        </Box>
        {!isMobile && isLaptop && (
          <TextFilter
            onChange={triggerSubmit}
            sx={{
              flexGrow: 1,
              "& label": { display: "none" },
              "& .MuiTextField-root": { bgcolor: "white" },
            }}
          />
        )}
        <FormControlLabel
          control={<Switch value={isMapOpen} onChange={onToggleMap} />}
          label={t("filters.map")}
          labelPlacement={"top"}
        />
      </Stack>
      {isMobile && (
        <TextFilter
          onChange={triggerSubmit}
          sx={{
            "& label": { display: "none" },
            "& .MuiTextField-root": { bgcolor: "white" },
          }}
        />
      )}
    </Stack>
  );
};

export default FiltersContainerMobile;
