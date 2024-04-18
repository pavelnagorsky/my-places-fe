import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import reportsService from "@/services/reports-service/reports.service";
import { CrmStatusesEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

interface IUseReportRejectionProps {
  id: number;
  onSuccess: () => void;
}

const useReportRejection = ({ id, onSuccess }: IUseReportRejectionProps) => {
  const { t } = useTranslation(["moderation", "common"]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (loading) return;
    setLoading(true);
    reportsService
      .changeStatus(id, CrmStatusesEnum.DECLINED)
      .then(() => {
        setLoading(false);
        onSuccess();
        dispatch(
          showAlert({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("feedback.report.rejectReport.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showAlert({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("feedback.report.rejectReport.error")} ${t(
                "errors.description",
                {
                  ns: "common",
                }
              )}`,
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  return {
    onSubmit,
    loading,
  };
};

export default useReportRejection;
