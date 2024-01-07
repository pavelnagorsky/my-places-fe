import { useForm, useFormContext } from "react-hook-form-mui";
import { useRouter } from "next/router";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { IPlaceTypeFormContext } from "@/containers/admin/place-types/place-type/interfaces";
import placeTypesService from "@/services/place-types-service/place-types.service";
import { ICreatePlaceTypeAdmin } from "@/services/place-types-service/interfaces";

const usePlaceType = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const editMode = !!id && id !== "new";
  const { handleSubmit } = useFormContext<IPlaceTypeFormContext>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleShowError = (description: string) => {
    dispatch(
      showAlert({
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
      showAlert({
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
    return placeTypesService
      .deleteAdmin(id)
      .then(() => {
        setLoadingDelete(false);
        // success feedback
        handleShowSuccess("Тип был успешно удален.");
        router.push(`/administration/place-types`);
      })
      .catch(() => {
        setLoadingDelete(false);
        // error feedback
        handleShowError(
          "Ошибка при удалении типа. Возможно он уже используется в некоторых местах..."
        );
      });
  };

  const handleSave = () => {
    if (loading) return;
    setLoading(true);
    handleSubmit((data) => {
      const dto: ICreatePlaceTypeAdmin = {
        titleTranslations: data.titleTranslations,
        commercial: data.commercial,
        imageId: data.image ? data.image.id : null,
        imageId2: data.image2 ? data.image2.id : null,
      };
      const action = editMode
        ? () => placeTypesService.updateAdmin(id, dto)
        : () => placeTypesService.createAdmin(dto);
      action()
        .then(() => {
          setLoading(false);
          // success feedback
          if (editMode) {
            handleShowSuccess("Тип был успешно обновлен.");
          } else {
            handleShowSuccess("Тип был успешно создан.");
          }
          router.push("/administration/place-types");
        })
        .catch(() => {
          setLoading(false);
          // error feedback
          if (editMode) {
            handleShowError("Ошибка при обновлении типа.");
          } else {
            handleShowError("Ошибка при создании типа.");
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

export default usePlaceType;
