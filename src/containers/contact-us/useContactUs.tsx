import { useForm } from "react-hook-form-mui";
import { IContactUsForm } from "@/containers/contact-us/interfaces";
import { UserTypesEnum } from "@/services/contact-service/interfaces";
import { useState } from "react";
import contactService from "@/services/contact-service/contact.service";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";

const useContactUs = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<IContactUsForm>({
    defaultValues: {
      fullName: "",
      email: "",
      userType: UserTypesEnum.PRIVATE,
      phone: "",
      message: "",
    },
    mode: "onChange",
    shouldUseNativeValidation: false,
  });

  const handleShowError = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Ошибка!",
          description:
            "Ошибка при отправке обратной связи. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = (email: string) => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Успех!",
          description: `Сообщение было успешно отправлено. Ваш запрос будет обработан администрацией и Вам придет ответ на электронную почту ${email}`,
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {
          autoHideDuration: 5000,
        },
      })
    );
  };

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      data.userType = +data.userType;
      contactService
        .create(data)
        .then(() => {
          setLoading(false);
          handleShowSuccess(data.email);
          form.reset();
        })
        .catch((e) => {
          setLoading(false);
          handleShowError();
        });
    })();
  };

  return { form, onSubmit, loading };
};

export default useContactUs;
