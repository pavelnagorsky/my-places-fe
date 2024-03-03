import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { Controller } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { SxProps } from "@mui/material";

interface IPhoneInputProps {
  fieldName: string;
  disableValidation?: boolean;
  sx?: SxProps;
  fillWidth?: boolean;
  id?: string;
}
const PhoneInput = ({
  fieldName,
  disableValidation,
  sx,
  fillWidth,
  id,
}: IPhoneInputProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Controller
      name={fieldName}
      rules={disableValidation ? undefined : { validate: matchIsValidTel }}
      render={({ field, fieldState }) => (
        <MuiTelInput
          InputProps={{ id }}
          dir={"ltr"}
          onChange={field.onChange}
          inputRef={field.ref}
          inputMode={"tel"}
          sx={sx}
          fullWidth={fillWidth}
          // sx={(theme) => bootstrapInputSx(theme)}
          defaultCountry={"BY"}
          value={field.value}
          langOfCountryName={i18n.language.toUpperCase()}
          onlyCountries={["BY", "RU", "UA", "PL", "LT", "LV"]}
          preferredCountries={["BY", "RU"]}
          error={fieldState.invalid}
          helperText={
            fieldState.invalid ? "Введен неверный номер телефона" : undefined
          }
        />
      )}
    />
  );
};

export default PhoneInput;
