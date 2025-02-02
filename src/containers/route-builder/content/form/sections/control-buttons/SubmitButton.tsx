import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectHasItems,
  selectIsEditingMode,
  selectSubmitLoading,
} from "@/store/route-builder-slice/route-builder.slice";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import { saveRouteThunk } from "@/store/route-builder-slice/thunks";

const SubmitButton = () => {
  const { t } = useTranslation(["route-management", "common"]);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSubmitLoading);
  const hasItems = useAppSelector(selectHasItems);
  const isAuth = useAppSelector(selectIsAuth);
  const isEditMode = useAppSelector(selectIsEditingMode);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<IRouteBuilderForm>();

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", {
            ns: "common",
          }),
          description: `${
            isEditMode ? t("feedback.update.error") : t("feedback.create.error")
          } ${t("errors.description", {
            ns: "common",
          })}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.success", {
            ns: "common",
          }),
          description: isEditMode
            ? t("feedback.update.success")
            : t("feedback.create.success"),
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
    if (isEditMode) {
      router.push(routerLinks.personalAreaRoutes);
    }
  };

  const onSubmit = () => {
    if (loading) return;

    if (!isAuth) {
      dispatch(openAuth({}));
      return;
    }

    handleSubmit((data) => {
      dispatch(
        saveRouteThunk({
          route: {
            coordinatesStart: data.searchFrom.coordinates as string,
            coordinatesEnd: data.searchTo.coordinates as string,
            title: data.title,
            travelMode: data.travelMode,
          },
          onError: handleShowError,
          onSuccess: handleShowSuccess,
        })
      );
    })();
  };

  return (
    <Button
      disabled={!isValid || !hasItems}
      variant={"contained"}
      size={"large"}
      endIcon={loading && <CircularProgress color="inherit" size={22} />}
      onClick={onSubmit}
    >
      {isEditMode ? t("updateRoute") : t("createRoute")}
    </Button>
  );
};

export default SubmitButton;
