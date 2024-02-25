import { useForm } from "react-hook-form-mui";
import { useState } from "react";
import placesService from "@/services/places-service/places.service";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import reportsService from "@/services/reports-service/reports.service";
import { CrmStatusesEnum } from "@/services/interfaces";

interface IUsePlaceRejectionProps {
  placeId: number;
  reportId: number;
  onSuccess: () => void;
}

const usePlaceRejection = ({
  placeId,
  reportId,
  onSuccess,
}: IUsePlaceRejectionProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<{ feedback: string }>({
    defaultValues: {
      feedback: "",
    },
    mode: "onChange",
  });

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      placesService
        .moderatePlace(placeId, {
          feedback: data.feedback,
          accept: false,
        })
        .then(() => {
          setLoading(false);
          reportsService
            .changeStatus(reportId, CrmStatusesEnum.DONE)
            .then(() => {})
            .catch(() => {});
          onSuccess();
          dispatch(
            showAlert({
              alertProps: {
                title: "Успех!",
                description: "Место было успешно отклонено модерацией",
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
                description: `Ошибка при отклонении места. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...`,
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default usePlaceRejection;
