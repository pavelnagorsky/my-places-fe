import { SubmitHandler } from "react-hook-form-mui";
import { ICityFormContext } from "@/containers/admin/cities/city/interfaces";
import { useState } from "react";
import { ICreateCity } from "@/services/cities-service/interfaces/interfaces";
import citiesService from "@/services/cities-service/cities.service";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { ISelect } from "@/shared/interfaces";
import parseLanguageToId from "@/shared/parseLanguageToId";

const useNewCityFormSubmit = ({
  onSuccess,
}: {
  onSuccess: (option: ISelect) => void;
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const { t, i18n } = useTranslation("common");
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ICityFormContext> = (data) => {
    if (submitLoading) return;
    setSubmitLoading(true);
    const dto: ICreateCity = {
      titleTranslations: data.titleTranslations,
    };
    citiesService
      .create(dto)
      .then((res) => {
        onSuccess({
          id: res.data.id,
          label:
            data.titleTranslations.find(
              (tr) => tr.langId === parseLanguageToId(i18n.language)
            )?.text || "",
        });
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error"),
              description: t("errors.description"),
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      })
      .finally(() => setSubmitLoading(false));
  };

  return { onSubmit, submitLoading };
};

export default useNewCityFormSubmit;
