import { useForm } from "react-hook-form-mui";
import { IContactUsForm } from "@/containers/contact-us/interfaces";
import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";
import { useState } from "react";
import contactService from "@/services/contact-service/contact.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import utils from "@/shared/utils";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytics.enum";

const useContactUs = () => {
  const { t } = useTranslation(["contact-us", "common"]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const sendAnalytics = useAnalytics();

  const form = useForm<IContactUsForm>({
    defaultValues: {
      fullName: "",
      email: "",
      userType: UserTypesEnum.PRIVATE,
      phone: "",
      message: "",
    },
    mode: "onChange",
    shouldUseNativeValidation: false,
  });

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", { ns: "common" }),
          description: `${t("feedback.error")} ${t("errors.description", {
            ns: "common",
          })}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = (email: string) => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.success", { ns: "common" }),
          description: `${t("feedback.success")} ${email}`,
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {
          autoHideDuration: 6000,
        },
      })
    );
  };

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      sendAnalytics(AnalyticsEventsEnum.CustomClick, {
        title: "contacts us submit",
      });
      setLoading(true);
      data.userType = +data.userType;
      data.phone = utils.sanitizePhoneNumber(data.phone);
      contactService
        .create(data)
        .then(() => {
          setLoading(false);
          handleShowSuccess(data.email);
          form.reset();
        })
        .catch((e) => {
          setLoading(false);
          handleShowError();
        });
    })();
  };

  return { form, onSubmit, loading };
};

export default useContactUs;
