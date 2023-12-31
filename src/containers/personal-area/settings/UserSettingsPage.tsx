import useSettings from "@/containers/personal-area/settings/useSettings";
import animationVariants from "@/shared/animation-variants";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import { motion } from "framer-motion";
import {
  FormProvider,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import useLanguages from "@/hooks/useLanguages";
import SaveIcon from "@mui/icons-material/Save";
import regExp from "@/shared/regExp";

const UserSettingsPage = () => {
  const logic = useSettings();
  const languages = useLanguages();
  const languageOptions = [{ id: "", label: "Нету" }].concat(
    languages as any[]
  );

  return (
    <PersonalAreaLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Box mb={"1em"}>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Stack
              mb={"30px"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography mb={0} variant={"h1"}>
                Настройки профиля
              </Typography>
            </Stack>
          </motion.div>
        </Box>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <FormProvider {...logic.form}>
            <Grid container spacing={"2em"} mb={"2em"}>
              <Grid item xs={12} md={6}>
                <CustomLabel htmlFor={"firstName"}>Имя</CustomLabel>
                <TextFieldElement
                  name={"firstName"}
                  id={"firstName"}
                  required
                  fullWidth
                  placeholder={"Ваше имя..."}
                  parseError={(error) => {
                    return error.type === "maxLength"
                      ? "Превышена максимальная длина строки"
                      : "Это поле обязательно к заполнению";
                  }}
                  validation={{
                    pattern: regExp.noWhiteSpaces,
                    required: true,
                    maxLength: 30,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomLabel htmlFor={"lastName"}>Фамилия</CustomLabel>
                <TextFieldElement
                  name={"lastName"}
                  id={"lastName"}
                  required
                  fullWidth
                  placeholder={"Ваша фамилия..."}
                  parseError={(error) => {
                    return error.type === "maxLength"
                      ? "Превышена максимальная длина строки"
                      : "Это поле обязательно к заполнению";
                  }}
                  validation={{
                    pattern: regExp.noWhiteSpaces,
                    required: true,
                    maxLength: 30,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomLabel htmlFor={"email"}>Электронная почта</CustomLabel>
                <TextFieldElement
                  type={"email"}
                  name={"email"}
                  id={"email"}
                  fullWidth
                  required
                  placeholder={"Введите адрес электронной почты..."}
                  validation={{
                    required: "Это поле обязательно к заполнению",
                    pattern: {
                      value: regExp.email,
                      message: "Введен некорректный адрес электронной почты",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomLabel htmlFor={"preferredLanguageId"}>Язык</CustomLabel>
                <SelectElement
                  name={"preferredLanguageId"}
                  SelectProps={{ id: "preferredLanguageId" }}
                  options={languageOptions}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  disabled={!logic.form.formState.isDirty}
                  variant={"contained"}
                  onClick={logic.onSubmit}
                  startIcon={
                    logic.loading ? (
                      <CircularProgress size={23} color={"inherit"} />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  size={"large"}
                  sx={{
                    borderRadius: "10px",
                    py: "1em",
                    width: "100%",
                    mt: "1em",
                  }}
                >
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </FormProvider>
        </motion.div>
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default UserSettingsPage;
