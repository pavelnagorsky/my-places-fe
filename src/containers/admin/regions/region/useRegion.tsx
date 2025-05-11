import { useFormContext } from "react-hook-form-mui";
import { useRouter } from "next/router";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { IRegionFormContext } from "@/containers/admin/regions/region/interfaces";
import regionsService from "@/services/regions-service/regions.service";
import { ICreateRegion } from "@/services/regions-service/interfaces/interfaces";

const useRegion = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const editMode = !!id && id !== "new";
  const { handleSubmit } = useFormContext<IRegionFormContext>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleShowError = (description: string) => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: "Ошибка!",
          description: description,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = (description: string) => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: "Успех!",
          description: description,
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const handleDelete = () => {
    if (!editMode) return;
    if (loadingDelete) return;
    setLoadingDelete(true);
    return regionsService
      .delete(id)
      .then(() => {
        setLoadingDelete(false);
        // success feedback
        handleShowSuccess("Область была успешно удалена.");
        router.push(`/administration/regions`);
      })
      .catch(() => {
        setLoadingDelete(false);
        // error feedback
        handleShowError(
          "Ошибка при удалении области. Возможно она уже используется в некоторых экскурсиях..."
        );
      });
  };

  const handleSave = () => {
    if (loading) return;
    setLoading(true);
    handleSubmit((data) => {
      const dto: ICreateRegion = {
        titleTranslations: data.titleTranslations,
      };
      const action = editMode
        ? () => regionsService.update(id, dto)
        : () => regionsService.create(dto);
      action()
        .then(() => {
          setLoading(false);
          // success feedback
          if (editMode) {
            handleShowSuccess("Область была успешно обновлена.");
          } else {
            handleShowSuccess("Область была успешно создана.");
          }
          router.push("/administration/regions");
        })
        .catch(() => {
          setLoading(false);
          // error feedback
          if (editMode) {
            handleShowError("Ошибка при обновлении области.");
          } else {
            handleShowError("Ошибка при создании области.");
          }
        });
    })();
  };

  return {
    handleDelete,
    handleSave,
    editMode,
    loading,
    loadingDelete,
  };
};

export default useRegion;
