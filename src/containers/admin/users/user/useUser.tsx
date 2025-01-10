import { useCallback, useEffect, useState } from "react";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import userService from "@/services/user-service/user.service";
import { useRouter } from "next/router";
import { IModerator } from "@/services/user-service/interfaces/moderator.interface";
import { useForm } from "react-hook-form-mui";
import {
  IBlockUserForm,
  IModeratorForm,
} from "@/containers/admin/users/user/interfaces";
import utils from "@/shared/utils";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";

const useUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query as { id: string };

  const [user, setUser] = useState<IUserShortInfo | null>(null);
  const [moderator, setModerator] = useState<IModerator | null>(null);

  const [blockLoading, setBlockLoading] = useState(false);
  const [moderatorLoading, setModeratorLoading] = useState(false);
  const [moderatorDeleteLoading, setModeratorDeleteLoading] = useState(false);

  const blockForm = useForm<IBlockUserForm>({
    defaultValues: {
      reason: "",
      blockEndDate: null as any,
    },
    mode: "onChange",
  });

  const moderatorForm = useForm<IModeratorForm>({
    defaultValues: {
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  const fetch = () => {
    // get user
    userService
      .getUserDataForAdmin(query.id)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
    // get moderator
    userService
      .getModeratorDataForAdmin(query.id)
      .then(({ data }) => {
        setModerator(data);
        moderatorForm.reset({
          phone: data.phone,
          address: data.address,
        });
      })
      .catch(() => {
        setModerator(null);
        moderatorForm.reset({
          phone: "",
          address: "",
        });
      });
  };

  const handleBlockUser = useCallback(
    (onSuccess: () => void) => {
      blockForm.handleSubmit((data) => {
        if (blockLoading) return;
        onSuccess();
        setBlockLoading(true);
        userService
          .blockUser(query.id, {
            blockEnd: new Date(data.blockEndDate).toISOString(),
            reason: data.reason,
          })
          .then(() => {
            setBlockLoading(false);
            dispatch(
              showAlertThunk({
                alertProps: {
                  title: "Успех!",
                  description: "Пользователь успешно заблокирован",
                  variant: "standard",
                  severity: "success",
                },
                snackbarProps: {
                  autoHideDuration: 3000,
                },
              })
            );
            fetch();
          })
          .catch(() => {
            setBlockLoading(false);
            dispatch(
              showAlertThunk({
                alertProps: {
                  title: "Ошибка!",
                  description: "Ошибка при блокировке пользователя.",
                  variant: "standard",
                  severity: "error",
                },
                snackbarProps: {},
              })
            );
          });
      })();
    },
    [blockLoading]
  );

  const handleUnblockUser = useCallback(() => {
    if (blockLoading) return;
    setBlockLoading(true);
    userService
      .unblockUser(query.id)
      .then(() => {
        setBlockLoading(false);
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Успех!",
              description: "Пользователь успешно разблокирован",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {
              autoHideDuration: 3000,
            },
          })
        );
        fetch();
      })
      .catch(() => {
        setBlockLoading(false);
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Ошибка!",
              description: "Ошибка при разблокировке пользователя.",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  }, [blockLoading]);

  const handleSaveModerator = useCallback(() => {
    moderatorForm.handleSubmit((data) => {
      if (moderatorLoading) return;
      setModeratorLoading(true);
      userService
        .saveModerator(query.id, {
          phone: utils.sanitizePhoneNumber(data.phone),
          address: data.address,
        })
        .then(() => {
          fetch();
          setModeratorLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: "Данные модератора были успешно сохранены",
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {
                autoHideDuration: 3000,
              },
            })
          );
        })
        .catch(() => {
          setModeratorLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Ошибка!",
                description: "Ошибка при сохранении модератора.",
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  }, [moderatorLoading]);

  const handleRemoveModerator = useCallback(() => {
    if (moderatorDeleteLoading) return;
    setModeratorDeleteLoading(true);
    userService
      .deleteModerator(query.id)
      .then(() => {
        fetch();
        setModeratorDeleteLoading(false);
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Успех!",
              description: "Доступ модератора был успешно удален",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {
              autoHideDuration: 3000,
            },
          })
        );
      })
      .catch(() => {
        setModeratorDeleteLoading(false);
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Ошибка!",
              description: "Ошибка при удалении доступа модератора.",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  }, [moderatorDeleteLoading]);

  useEffect(() => {
    fetch();
  }, [query.id]);

  return {
    user,
    moderator,
    moderatorForm,
    blockForm,
    handleBlockUser,
    handleSaveModerator,
    handleUnblockUser,
    handleRemoveModerator,
    moderatorLoading,
    blockLoading,
    moderatorDeleteLoading,
  };
};

export default useUser;
