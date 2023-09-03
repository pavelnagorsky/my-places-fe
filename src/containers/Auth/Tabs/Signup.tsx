import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { ISignupRequest } from "@/services/auth-service/interfaces";
import { Box, FormLabel } from "@mui/material";
import regExp from "@/shared/regExp";
import { Button } from "@/components/UI/Button/Button";
import NextMuiLink from "@/components/NextMuiLink/NextMuiLink";
import { Fragment } from "react";

const Signup = () => {
  const form = useForm<ISignupRequest>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    shouldUseNativeValidation: false,
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ISignupRequest> = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        "& .MuiFormLabel-root": {
          fontWeight: 600,
          fontSize: "16px",
          textTransform: "uppercase",
          ml: "0.7em",
          display: "block",
          mb: "0.5em",
        },
      }}
    >
      <FormContainer formContext={form} onSuccess={onSubmit}>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"auth-email"}>Почта</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"email"}
            type={"email"}
            id={"auth-email"}
            placeholder={"Введите адрес электронной почты..."}
            validation={{
              required: "Это поле обязательно к заполнению",
              pattern: {
                value: regExp.email,
                message: "Введен некорректный адрес электронной почты",
              },
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"auth-firstname"}>Имя</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"firstName"}
            id={"auth-firstname"}
            placeholder={"Ваше имя..."}
            validation={{
              required: "Это поле обязательно к заполнению",
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"auth-lastname"}>Фамилия</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"lastName"}
            id={"auth-lastname"}
            placeholder={"Ваша фамилия..."}
            validation={{
              minLength: 1,
              required: "Это поле обязательно к заполнению",
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"auth-password"}>Пароль</FormLabel>
          <PasswordElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"password"}
            type={"password"}
            id={"auth-password"}
            placeholder={"Введите пароль..."}
            validation={{
              required: "Это поле обязательно к заполнению",
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"auth-password-confirm"}>
            Подтверждение пароля
          </FormLabel>
          <PasswordRepeatElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            passwordFieldName={"password"}
            name={"passwordConfirm"}
            type={"password"}
            id={"auth-password-confirm"}
            placeholder={"Подтвердите пароль..."}
            validation={{
              required: "Это поле обязательно к заполнению",
            }}
          />
        </Box>
        <Box
          ml={"0.5em"}
          sx={{
            //color: "#565656",
            position: "relative",
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
        >
          <CheckboxElement
            color={"secondary"}
            name={"privacyPolicy"}
            required
            validation={{
              required: "Для регистрации необходимо согласие",
            }}
            label={
              <Fragment>
                Регистрируясь на сайте, вы соглашаетесь с нашей
                <NextMuiLink
                  target={"_blank"}
                  href={"/privacy-policy"}
                  sx={{
                    ml: "5px",
                    color: "unset",
                    textDecoration: "underline",
                  }}
                >
                  Политикой конфиденциальности
                </NextMuiLink>
              </Fragment>
            }
          />
        </Box>
        <Button
          type={"submit"}
          fullWidth
          sx={{
            fontWeight: 700,
            mt: { xs: "1.5em", sm: "1.3em" },
            py: "0.8em",
            mb: { xs: "2em", sm: "1.3em" },
          }}
          variant={"contained"}
        >
          Зарегистрироваться
        </Button>
      </FormContainer>
    </Box>
  );
};

export default Signup;
