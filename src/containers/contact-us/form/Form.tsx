import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import {
  FieldError,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import regExp from "@/shared/regExp";
import useUserTypes from "@/containers/contact-us/form/user-types/useUserTypes";
import PhoneInput from "@/components/forms/PhoneInput";
import { Button } from "@/components/UI/button/Button";

interface IFormProps {
  onSubmit: () => void;
  loading: boolean;
}

const Form = ({ onSubmit, loading }: IFormProps) => {
  const userTypes = useUserTypes();
  const parseError = (e: FieldError): string => {
    if (e.type === "pattern")
      return "Введен некорректный адрес электронной почты";
    return "Это поле обязательно к заполнению";
  };

  return (
    <Box>
      <Typography
        component={"h2"}
        fontWeight={600}
        fontSize={{ xs: "20px", md: "30px" }}
        mt={{ xs: "0.5em", md: "0.4em" }}
        mb={"0.8em"}
      >
        Контактная информация
      </Typography>
      <Stack gap={"1em"}>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            fontSize={{ xs: "14px", md: "20px" }}
          >
            Имя и Фамилия
          </Typography>
          <TextFieldElement
            required
            fullWidth
            name={"fullName"}
            validation={{
              required: true,
            }}
            parseError={parseError}
            label={"Имя и фамилия"}
          />
        </Box>
        <Box
          sx={{
            "& .MuiFormControl-root": {
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              columnGap: "1em",
            },
          }}
        >
          <RadioButtonGroup
            row
            required
            parseError={parseError}
            label={"Кто вы?"}
            type={"number"}
            options={userTypes}
            name={"userType"}
          />
        </Box>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            fontSize={{ xs: "14px", md: "20px" }}
          >
            Электронная почта
          </Typography>
          <TextFieldElement
            fullWidth
            name={"email"}
            type={"email"}
            validation={{
              pattern: regExp.email,
              required: true,
            }}
            required
            parseError={parseError}
            label={"Электронная почта"}
          />
        </Box>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            fontSize={{ xs: "14px", md: "20px" }}
          >
            Телефон
          </Typography>
          <PhoneInput fillWidth fieldName={"phone"} disableValidation />
        </Box>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            fontSize={{ xs: "14px", md: "20px" }}
          >
            Сообщение
          </Typography>
          <TextFieldElement
            required
            fullWidth
            multiline
            minRows={3}
            name={"message"}
            validation={{
              required: true,
            }}
            parseError={parseError}
            label={"Сообщение"}
          />
        </Box>
        <Button
          sx={{ py: "0.8em", mt: "1em" }}
          variant={"contained"}
          type={"submit"}
          onClick={onSubmit}
        >
          {loading ? (
            <CircularProgress color={"inherit"} size={25} />
          ) : (
            "Отправить"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default Form;
