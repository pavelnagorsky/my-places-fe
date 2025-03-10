import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { routerLinks } from "@/routing/routerLinks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { resetState } from "@/store/excursion-builder-slice/excursion-builder.slice";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { IEditExcursionForm } from "@/containers/personal-area/my-excursions/edit-excursion/logic/interfaces";
import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";
import { startExcursionEditingThunk } from "@/store/excursion-builder-slice/thunks";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";

const useEditMyExcursion = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const excursionId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);

  const form = useForm<IEditExcursionForm>({
    defaultValues: {
      addPlaces: [],
      title: "",
      description: "",
      places: [],
      travelMode: TravelModesEnum.DRIVING,
      type: `${ExcursionTypesEnum.Overview}`,
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onGoBack = () => router.replace(routerLinks.personalAreaExcursions);

  const handleShowNotFoundError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", {
            ns: "common",
          }),
          description: `${t("feedback.notFound")} ${t("errors.description", {
            ns: "common",
          })}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
    onGoBack();
  };

  useEffect(() => {
    // fetch data for editing
    if (!excursionId || Number.isNaN(+excursionId)) {
      handleShowNotFoundError();
      return;
    }

    setLoading(true);

    const onSuccess = async (data: IExcursion) => {
      // try {
      //   // reset form state
      //   form.reset({
      //     ...form.getValues(),
      //     title: data.title,
      //     type: `${data.type || ExcursionTypesEnum.Overview}`,
      //     travelMode: data.travelMode || TravelModesEnum.DRIVING,
      //   });
      // } catch (e) {}
      setLoading(false);
    };

    const onError = () => {
      setLoading(false);
      handleShowNotFoundError();
    };

    dispatch(
      startExcursionEditingThunk({
        id: +excursionId,
        language: i18n.language,
        onSuccess,
        onError,
      })
    );
  }, [i18n.language, excursionId]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return {
    form,
    loading,
    onGoBack,
  };
};

export default useEditMyExcursion;
