import { selectRouteDirectionsLoading } from "@/store/route-builder-slice/route-builder.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import {
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import { getExcursionDirectionsThunk } from "@/store/excursion-builder-slice/thunks";

const OptimizeButton = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const loading = useAppSelector(selectRouteDirectionsLoading);
  const { t, i18n } = useTranslation("route-management");
  const {
    getValues,
    formState: { isValid },
  } = useFormContext<IExcursionBuilderForm>();

  const onClickOptimize = () => {
    dispatch(
      getExcursionDirectionsThunk({
        language: i18n.language,
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
