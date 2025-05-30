import { selectRouteDirectionsLoading } from "@/store/route-builder-slice/route-builder.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import {
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { getRouteDirectionsThunk } from "@/store/route-builder-slice/thunks";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytics.enum";
import useAnalytics from "@/hooks/analytics/useAnalytics";

const OptimizeButton = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const loading = useAppSelector(selectRouteDirectionsLoading);
  const { t, i18n } = useTranslation("route-management");
  const {
    getValues,
    formState: { isValid },
  } = useFormContext<IRouteBuilderForm>();
  const sendAnalytics = useAnalytics();

  const onClickOptimize = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "route: optimize button",
    });
    const coordinatesStartString = getValues("searchFrom.coordinates");
    const startLatLng = coordinatesStartString
      ? utils.stringToLatLng(coordinatesStartString)
      : null;
    const coordinatesEndString = getValues("searchTo.coordinates");
    const endLatLng = coordinatesEndString
      ? utils.stringToLatLng(coordinatesEndString)
      : null;
    if (!startLatLng || !endLatLng) return;
    dispatch(
      getRouteDirectionsThunk({
        language: i18n.language,
        startLatLng,
        endLatLng,
        optimizeWaypoints: true,
        travelMode: getValues("travelMode"),
      })
    ).then(() => {
      if (isMobile) return;
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  return (
    <Button
      onClick={onClickOptimize}
      variant={"outlined"}
      disabled={!isValid}
      size={"large"}
      sx={{ borderWidth: 2 }}
      endIcon={
        loading ? (
          <CircularProgress color="inherit" size={22} />
        ) : (
          <SettingsSuggestIcon />
        )
      }
    >
      {t("optimize")}
    </Button>
  );
};

export default OptimizeButton;
