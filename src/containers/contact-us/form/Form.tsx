import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import {
  FieldError,
  RadioButtonGroup,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import regExp from "@/shared/regExp";
import useUserTypes from "@/containers/contact-us/form/user-types/useUserTypes";
import PhoneInput from "@/components/forms/PhoneInput";
import { Button } from "@/components/UI/button/Button";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store/hooks";
import { selectUserData } from "@/store/user-slice/user.slice";
import { useEffect } from "react";
import { IContactUsForm } from "@/containers/contact-us/interfaces";

interface IFormProps {
  onSubmit: () => void;
  loading: boolean;
}

const Form = ({ onSubmit, loading }: IFormProps) => {
  const { t } = useTranslation(["contact-us", "common"]);
  const { setValue } = useFormContext<IContactUsForm>();
  const userData = useAppSelector(selectUserData);
  const userTypes = useUserTypes();
  const parseError = (e: FieldError): string => {
    if (e.type === "pattern") return t("errors.email", { ns: "common" });
    return t("errors.required", { ns: "common" });
  };

  useEffect(() => {
    if (!userData) return;
    setValue("fullName", `${userData.firstName} ${userData.lastName}`);
    setValue("email", userData.email);
  }, [userData]);

  return (
    <Box>
      <Typography
        component={"h2"}
        fontWeight={600}
        fontSize={{ xs: "20px", md: "30px" }}
        mt={{ xs: "0.5em", md: "0.4em" }}
        mb={"0.8em"}
      >
        {t("form.title")}
      </Typography>
      <Stack gap={"1em"}>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            component={"label"}
            display={"block"}
            htmlFor={"fullName"}
            fontSize={{ xs: "16px", md: "20px" }}
          >
            {t("form.fullName")}
          </Typography>
          <TextFieldElement
            required
            fullWidth
            name={"fullName"}
            id={"fullName"}
            validation={{
              required: true,
            }}
            parseError={parseError}
            placeholder={t("form.fullName")}
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
            label={t("form.whoAreYou")}
            type={"number"}
            options={userTypes}
            name={"userType"}
          />
        </Box>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            component={"label"}
            display={"block"}
            htmlFor={"email"}
            fontSize={{ xs: "16px", md: "20px" }}
          >
            {t("form.email")}
          </Typography>
          <TextFieldElement
            fullWidth
            name={"email"}
            type={"email"}
            id={"email"}
            validation={{
              pattern: regExp.email,
              required: true,
            }}
            required
            parseError={parseError}
            placeholder={t("form.email")}
          />
        </Box>
        <Box>
          <Typography
            variant={"body2"}
            mb={"0.5em"}
            component={"label"}
            display={"block"}
            htmlFor={"phone"}
            fontSize={{ xs: "16px", md: "20px" }}
          >
            {t("form.phone")}
          </Typography>
          <PhoneInput
            id={"phone"}
            fillWidth
            fieldName={"phone"}
            disableValidation
          />
        </Box>
        <Box>
          <Typography
            variant={"body2"}
            component={"label"}
            display={"block"}
            htmlFor={"message"}
            mb={"0.5em"}
            fontSize={{ xs: "16px", md: "20px" }}
          >
            {t("form.message")}
          </Typography>
          <TextFieldElement
            required
            fullWidth
            multiline
            minRows={3}
            name={"message"}
            id={"message"}
            validation={{
              required: true,
            }}
            parseError={parseError}
            placeholder={t("form.message")}
          />
        </Box>
        <Box>
          <Button
            sx={{
              py: "0.8em",
              mt: "1em",
            }}
            variant={"contained"}
            type={"submit"}
            onClick={onSubmit}
          >
            {loading ? (
              <CircularProgress color={"inherit"} size={25} />
            ) : (
              t("buttons.send", { ns: "common" })
            )}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Form;
