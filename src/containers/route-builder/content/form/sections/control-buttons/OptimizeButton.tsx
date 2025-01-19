import {
  getRouteDirectionsThunk,
  selectRouteDirectionsLoading,
} from "@/store/route-builder-slice/route-builder.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { Button, CircularProgress } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const OptimizeButton = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRouteDirectionsLoading);
  const { i18n } = useTranslation();
  const {
    getValues,
    formState: { isValid },
  } = useFormContext<IRouteBuilderForm>();

  const onClickOptimize = () => {
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
      })
    );
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
      Оптимизировать
    </Button>
  );
};

export default OptimizeButton;
