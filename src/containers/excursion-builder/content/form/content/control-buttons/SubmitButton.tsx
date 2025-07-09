import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectExcursionId,
  selectHasItems,
  selectIsEditingMode,
  selectItems,
  selectSubmitLoading,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import { useFormContext } from "react-hook-form-mui";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import { saveExcursionThunk } from "@/store/excursion-builder-slice/thunks";
import { ICreateExcursion } from "@/services/excursions-service/interfaces/create-excursion.interface";
import { IUpdateExcursion } from "@/services/excursions-service/interfaces/update-excursion.interface";
import { IEditExcursionForm } from "@/containers/personal-area/my-excursions/edit-excursion/logic/interfaces";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import useRouterPathWithoutQuery from "@/hooks/useRouterPathWithoutQuery";

const SubmitButton = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSubmitLoading);
  const isAuth = useAppSelector(selectIsAuth);
  const isEditMode = useAppSelector(selectIsEditingMode);
  const excursionId = useAppSelector(selectExcursionId);
  const items = useAppSelector(selectItems);
  const router = useRouter();
  const pathWithoutQuery = useRouterPathWithoutQuery();
  const isAdminMode = pathWithoutQuery.startsWith(
    routerLinks.administrationExcursions
  );
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<IEditExcursionForm>();
  const sendAnalytics = useAnalytics();

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
    if (isAdminMode) {
      if (excursionId) {
        router.push(routerLinks.administrationExcursion(excursionId));
      } else {
        router.push(routerLinks.administrationExcursions);
      }
    } else {
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
      sendAnalytics(AnalyticsEventsEnum.CustomClick, {
        title: "excursion: save click",
      });
      const payload: (ICreateExcursion | IUpdateExcursion) & {
        language: string;
      } = {
        title: data.title,
        description: data.description,
        travelMode: data.travelMode,
        type: +data.type,
        places: items.map((item) => ({
          id: item.id,
          excursionDuration: item.excursionDuration,
          description: item.excursionDescription,
        })),
        regionId: data.regionId || null,
        cityId: data.city?.id || null,
        shouldTranslate: data.updateTranslations,
        language: i18n.language,
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
      disabled={!isValid || items.length < 2}
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
