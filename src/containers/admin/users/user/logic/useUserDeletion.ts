import { useState } from "react";
import userService from "@/services/user-service/user.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";

const useUserDeletion = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDeleteUser = (id: number) => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    userService
      .deleteUser(id)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Успех!",
              description: "Пользователь был успешно удален",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {
              autoHideDuration: 3000,
            },
          })
        );
        router.push(routerLinks.administrationUsers);
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Ошибка!",
              description:
                "Ошибка при удалении пользователя, возможно он имеет связанные записи.",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return { handleDeleteUser, deleteLoading };
};

export default useUserDeletion;
