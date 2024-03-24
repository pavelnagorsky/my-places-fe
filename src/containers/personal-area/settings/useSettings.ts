import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserData } from "@/store/user-slice/user.slice";
import { useForm } from "react-hook-form-mui";
import { IUpdateUserFormContext } from "@/containers/personal-area/settings/interfaces";
import { useEffect, useState } from "react";
import userService from "@/services/user-service/user.service";
import { getUserDataThunk } from "@/store/user-slice/thunks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";

const useSettings = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const userData = useAppSelector(selectUserData);
  const form = useForm<IUpdateUserFormContext>({
    defaultValues: { preferredLanguageId: "" },
    shouldUseNativeValidation: false,
    shouldFocusError: true,
  });

  useEffect(() => {
    if (!userData) return;
    form.reset({
      preferredLanguageId: userData.preferredLanguage || "",
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      receiveEmails: userData.receiveEmails,
    });
  }, [userData]);

  const handleShowError = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Ошибка!",
          description:
            "Ошибка при обновлении профиля. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Успех!",
          description: "Профиль был успешно обновлен.",
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading || !userData?.id) return;
      setLoading(true);
      userService
        .updateUser({
          ...data,
          preferredLanguageId:
            typeof data.preferredLanguageId === "number"
              ? data.preferredLanguageId
              : undefined,
        })
        .then((res) => {
          setLoading(false);
          handleShowSuccess();
          dispatch(getUserDataThunk());
        })
        .catch(() => {
          setLoading(false);
          handleShowError();
        });
    })();
  };

  return {
    form,
    loading,
    onSubmit,
  };
};

export default useSettings;
