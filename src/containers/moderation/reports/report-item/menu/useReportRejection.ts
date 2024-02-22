import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import reportsService from "@/services/reports-service/reports.service";
import { CrmStatusesEnum } from "@/shared/interfaces";

interface IUseReportRejectionProps {
  id: number;
  onSuccess: () => void;
}

const useReportRejection = ({ id, onSuccess }: IUseReportRejectionProps) => {
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
              title: "Успех!",
              description: "Жалоба была успешно отклонена модерацией",
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
              title: "Ошибка!",
              description: `Ошибка при отклонении жалобы. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...`,
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
