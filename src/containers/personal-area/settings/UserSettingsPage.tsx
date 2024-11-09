import useSettings from "@/containers/personal-area/settings/useSettings";
import animationVariants from "@/shared/animation-variants";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import { motion } from "framer-motion";
import {
  CheckboxElement,
  FormProvider,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import useLanguages from "@/hooks/useLanguages";
import SaveIcon from "@mui/icons-material/Save";
import regExp from "@/shared/regExp";
import { useTranslation } from "next-i18next";

const UserSettingsPage = () => {
  const { t } = useTranslation(["personal-area", "common"]);
  const logic = useSettings();
  const languages = useLanguages();
  const languageOptions = [{ id: "", label: t("settings.missing") }].concat(
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
                {t("settings.title")}
              </Typography>
            </Stack>
          </motion.div>
        </Box>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <FormProvider {...logic.form}>
            <Grid container spacing={{ xs: "1em", md: "2em" }} mb={"4em"}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel htmlFor={"firstName"}>
                  {t("auth.signup.firstName", { ns: "common" })}
                </CustomLabel>
                <TextFieldElement
                  name={"firstName"}
                  id={"firstName"}
                  required
                  fullWidth
                  placeholder={t("auth.signup.firstNamePlaceholder", {
                    ns: "common",
                  })}
                  parseError={(error) => {
                    if (error.type === "pattern")
                      return t("errors.noWhiteSpaces", { ns: "common" });
                    return error.type === "maxLength"
                      ? t("errors.maxLength", { ns: "common", value: 30 })
                      : t("errors.required", { ns: "common" });
                  }}
                  rules={{
                    pattern: regExp.noWhiteSpaces,
                    required: true,
                    maxLength: 30,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel htmlFor={"lastName"}>
                  {t("auth.signup.lastName", { ns: "common" })}
                </CustomLabel>
                <TextFieldElement
                  name={"lastName"}
                  id={"lastName"}
                  required
                  fullWidth
                  placeholder={t("auth.signup.lastNamePlaceholder", {
                    ns: "common",
                  })}
                  parseError={(error) => {
                    if (error.type === "pattern")
                      return t("errors.noWhiteSpaces", { ns: "common" });
                    return error.type === "maxLength"
                      ? t("errors.maxLength", { ns: "common", value: 30 })
                      : t("errors.required", { ns: "common" });
                  }}
                  rules={{
                    pattern: regExp.noWhiteSpaces,
                    required: true,
                    maxLength: 30,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel htmlFor={"email"}>
                  {t("auth.login.emailLabel", { ns: "common" })}
                </CustomLabel>
                <TextFieldElement
                  type={"email"}
                  name={"email"}
                  id={"email"}
                  fullWidth
                  required
                  placeholder={t("auth.login.emailPlaceholder", {
                    ns: "common",
                  })}
                  rules={{
                    required: t("errors.required", { ns: "common" }),
                    pattern: {
                      value: regExp.email,
                      message: t("errors.email", { ns: "common" }),
                    },
                  }}
                />
                <Box mt={"0.5em"}>
                  <CheckboxElement
                    name={"receiveEmails"}
                    id={"receiveEmails"}
                    label={t("settings.receiveEmails")}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel htmlFor={"preferredLanguageId"}>
                  {t("settings.preferredLanguage")}
                </CustomLabel>
                <SelectElement
                  name={"preferredLanguageId"}
                  SelectProps={{ id: "preferredLanguageId" }}
                  options={languageOptions}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Box>
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
                      px: "2em",
                      mt: "1em",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {t("buttons.save", { ns: "common" })}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </FormProvider>
        </motion.div>
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default UserSettingsPage;
