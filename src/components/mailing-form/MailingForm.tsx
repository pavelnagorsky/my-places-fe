import { TextFieldElement, useForm } from "react-hook-form-mui";
import { Stack } from "@mui/material";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import regExp from "@/shared/regExp";
import TextEditor from "@/components/forms/text-editor/TextEditor";

const MailingForm = () => {
  return (
    <Stack gap={"1em"} width={"100%"}>
      <Stack>
        <CustomLabel htmlFor={"to"}>Email пользователя</CustomLabel>
        <TextFieldElement
          validation={{
            required: "Это поле обязательно к заполнению",
            pattern: {
              value: regExp.email,
              message: "Введен некорректный адрес электронной почты",
            },
          }}
          name={"to"}
          id={"to"}
          required
        />
      </Stack>
      <Stack>
        <CustomLabel htmlFor={"subject"}>Тема</CustomLabel>
        <TextFieldElement
          validation={{
            required: "Это поле обязательно к заполнению",
          }}
          name={"subject"}
          id={"subject"}
          required
        />
      </Stack>
      <Stack>
        <CustomLabel htmlFor={"text"}>Текст</CustomLabel>
        <TextEditor
          sx={{ "& .ql-container": { minHeight: "150px !important" } }}
          fieldName={"text"}
          placeholder={"Текст письма"}
        />
      </Stack>
    </Stack>
  );
};

export default MailingForm;
