import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectHasItems,
  selectIsEditingMode,
  selectSubmitLoading,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import { useFormContext } from "react-hook-form-mui";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import { saveExcursionThunk } from "@/store/excursion-builder-slice/thunks";
import { ICreateExcursion } from "@/services/excursions-service/interfaces/create-excursion.interface";

const SubmitButton = () => {
  const { t } = useTranslation(["excursion-management", "common"]);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSubmitLoading);
  const hasItems = useAppSelector(selectHasItems);
  const isAuth = useAppSelector(selectIsAuth);
  const isEditMode = useAppSelector(selectIsEditingMode);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<IExcursionBuilderForm>();

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
      router.push(routerLinks.personalAreaExcursions);
    }
  };

  const onSubmit = () => {
    if (loading) return;

    if (!isAuth) {
      dispatch(openAuth({}));
      return;
    }

    handleSubmit((data) => {
      const payload: ICreateExcursion = {
        title: data.title,
        description: data.description,
        travelMode: data.travelMode,
        type: +data.type,
        places: data.places,
      };
      dispatch(
        saveExcursionThunk({
          data: payload,
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
      {isEditMode ? t("updateExcursion") : t("createExcursion")}
    </Button>
  );
};

export default SubmitButton;
