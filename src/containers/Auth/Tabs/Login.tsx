import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { ILoginRequest } from "@/services/auth-service/interfaces";
import { Box, Divider, FormLabel, Stack } from "@mui/material";
import regExp from "@/shared/regExp";
import { Button } from "@/components/UI/Button/Button";

const Login = () => {
  const form = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    shouldUseNativeValidation: false,
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
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
        <Box width={"100%"} mb={"1.7em"}>
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
        <Box width={"100%"} mb={"1em"}>
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
        <Box ml={"0.5em"} sx={{ color: "#565656", position: "relative" }}>
          <CheckboxElement
            color={"secondary"}
            name={"rememberMe"}
            label={"Запомнить меня"}
          />
        </Box>
        <Button
          type={"submit"}
          fullWidth
          sx={{ fontWeight: 700, my: "1.3em", py: "0.8em" }}
          variant={"contained"}
        >
          Войти
        </Button>
      </FormContainer>
      <Divider sx={{ borderColor: "#D5D3D0", my: "1em" }} />
      <Stack justifyContent={"center"} mt="1.2em">
        <Button
          variant={"text"}
          color={"secondary"}
          sx={{
            textTransform: "none",
            color: "#DFDDDB",
            cursor: "pointer",
          }}
        >
          Забыли пароль?
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
