import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import excursionsService from "@/services/excursions-service/excursions.service";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";

const useExcursionModeration = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const excursionId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);
  const [excursion, setExcursion] = useState<IExcursion | null>(null);

  const onGoBack = () => router.replace(routerLinks.moderationExcursions);

  const handleShowNotFoundError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", { ns: "common" }),
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
    // fetch place data for editing
    if (!excursionId || Number.isNaN(+excursionId)) {
      handleShowNotFoundError();
      return;
    }
    setLoading(true);
    excursionsService
      .getExcursionById(+excursionId, i18n.language)
      .then(({ data }) => {
        setExcursion(data);
      })
      .catch(() => {
        return handleShowNotFoundError();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [excursionId, i18n.language]);

  return {
    loading,
    onGoBack,
    excursion,
    excursionId: excursionId ? +excursionId : null,
  };
};

export default useExcursionModeration;
