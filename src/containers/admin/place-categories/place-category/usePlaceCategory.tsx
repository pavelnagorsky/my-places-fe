import { useForm, useFormContext } from "react-hook-form-mui";
import { IPlaceCategoryFormContext } from "@/containers/admin/place-categories/place-category/interfaces";
import { useRouter } from "next/router";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";
import { ICreatePlaceCategoryAdmin } from "@/services/place-categories-service/interfaces";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";

const usePlaceCategory = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const editMode = !!id && id !== "new";
  const { handleSubmit } = useFormContext<IPlaceCategoryFormContext>();
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
    return placeCategoriesService
      .deleteAdmin(id)
      .then(() => {
        setLoadingDelete(false);
        // success feedback
        handleShowSuccess("Категория была успешно удалена.");
        router.push(`/administration/place-categories`);
      })
      .catch(() => {
        setLoadingDelete(false);
        // error feedback
        handleShowError(
          "Ошибка при удалении категории. Возможно она уже используется в некоторых местах..."
        );
      });
  };

  const handleSave = () => {
    if (loading) return;
    setLoading(true);
    handleSubmit((data) => {
      const dto: ICreatePlaceCategoryAdmin = {
        titleTranslations: data.titleTranslations,
        imageId: data.image ? data.image.id : null,
        imageId2: data.image2 ? data.image2.id : null,
      };
      const action = editMode
        ? () => placeCategoriesService.updateAdmin(id, dto)
        : () => placeCategoriesService.createAdmin(dto);
      action()
        .then(() => {
          setLoading(false);
          // success feedback
          if (editMode) {
            handleShowSuccess("Категория была успешно обновлена.");
          } else {
            handleShowSuccess("Категория была успешно создана.");
          }
          router.push("/administration/place-categories");
        })
        .catch(() => {
          setLoading(false);
          // error feedback
          if (editMode) {
            handleShowError("Ошибка при обновлении категории.");
          } else {
            handleShowError("Ошибка при создании категории.");
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

export default usePlaceCategory;
