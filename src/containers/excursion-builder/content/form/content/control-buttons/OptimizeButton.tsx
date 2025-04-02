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
import {
  IExcursionBuilderForm,
  IExcursionBuilderFormPlace,
} from "@/containers/excursion-builder/content/form/logic/interfaces";
import { getExcursionDirectionsThunk } from "@/store/excursion-builder-slice/thunks";
import {
  selectExcursionDirectionsLoading,
  selectItemsLength,
} from "@/store/excursion-builder-slice/excursion-builder.slice";

const OptimizeButton = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const loading = useAppSelector(selectExcursionDirectionsLoading);
  const placesCount = useAppSelector(selectItemsLength);
  const { t, i18n } = useTranslation("route-management");
  const { getValues, setValue } = useFormContext<IExcursionBuilderForm>();

  const onReorderFields = (reorderedIds: number[]) => {
    const fields = getValues("places");
    // Create a new array with the reordered fields
    const newFields = reorderedIds
      .map((id) => fields.find((field) => field.id === id))
      .filter(Boolean) as IExcursionBuilderFormPlace[];
    setValue("places", newFields);
  };

  const onClickOptimize = () => {
    dispatch(
      getExcursionDirectionsThunk({
        language: i18n.language,
        optimizeWaypoints: true,
        travelMode: getValues("travelMode"),
        onReorder: onReorderFields,
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
      disabled={placesCount < 4}
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
