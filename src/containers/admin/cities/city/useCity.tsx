import { useFormContext } from "react-hook-form-mui";
import { useRouter } from "next/router";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { ICityFormContext } from "@/containers/admin/cities/city/interfaces";
import citiesService from "@/services/cities-service/cities.service";
import { ICreateCity } from "@/services/cities-service/interfaces/interfaces";

const useCity = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const editMode = !!id && id !== "new";
  const { handleSubmit } = useFormContext<ICityFormContext>();
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
    return citiesService
      .delete(id)
      .then(() => {
        setLoadingDelete(false);
        // success feedback
        handleShowSuccess("Город был успешно удален.");
        router.push(`/administration/regions`);
      })
      .catch(() => {
        setLoadingDelete(false);
        // error feedback
        handleShowError(
          "Ошибка при удалении города. Возможно он уже используется в некоторых экскурсиях..."
        );
      });
  };

  const handleSave = () => {
    if (loading) return;
    setLoading(true);
    handleSubmit((data) => {
      const dto: ICreateCity = {
        titleTranslations: data.titleTranslations,
      };
      const action = editMode
        ? () => citiesService.update(id, dto)
        : () => citiesService.create(dto);
      action()
        .then(() => {
          setLoading(false);
          // success feedback
          if (editMode) {
            handleShowSuccess("Город был успешно обновлен.");
          } else {
            handleShowSuccess("Город был успешно создан.");
          }
          router.push("/administration/cities");
        })
        .catch(() => {
          setLoading(false);
          // error feedback
          if (editMode) {
            handleShowError("Ошибка при обновлении города.");
          } else {
            handleShowError("Ошибка при создании города.");
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

export default useCity;
