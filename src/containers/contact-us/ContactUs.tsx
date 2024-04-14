import { Box, Grid, Typography } from "@mui/material";
import InfoPanel from "@/containers/contact-us/form/InfoPanel";
import Form from "@/containers/contact-us/form/Form";
import animationVariants from "@/shared/animation-variants";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { motion } from "framer-motion";
import useContactUs from "@/containers/contact-us/useContactUs";
import { FormProvider } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";

const ContactUs = () => {
  const logic = useContactUs();
  const { t } = useTranslation("contact-us");

  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Grid container spacing={"4em"} mb="1em">
            <Grid item xs={12} md={7}>
              <Typography
                variant={"h1"}
                fontSize={{ xs: "30px", md: "40px" }}
                mb={"0.5em"}
              >
                {t("title")}
              </Typography>
              <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                {t("description")}
              </Typography>
            </Grid>
          </Grid>
        </motion.div>
        <Grid
          container
          spacing={{ xs: "2em", md: "4em", lg: "6em" }}
          mb={"6em"}
        >
          <Grid item xs={12} md={7}>
            <FormProvider {...logic.form}>
              <motion.div variants={animationVariants.defaultItemVariant}>
                <Form onSubmit={logic.onSubmit} loading={logic.loading} />
              </motion.div>
            </FormProvider>
          </Grid>
          <Grid item xs={12} md={5}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <InfoPanel />
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </WrappedContainer>
  );
};

export default ContactUs;
