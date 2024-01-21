import { Box, Grid, Typography } from "@mui/material";
import InfoPanel from "@/containers/contact-us/form/InfoPanel";
import Form from "@/containers/contact-us/form/Form";
import animationVariants from "@/shared/animation-variants";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { motion } from "framer-motion";
import useContactUs from "@/containers/contact-us/useContactUs";
import { FormProvider } from "react-hook-form-mui";

const ContactUs = () => {
  const logic = useContactUs();

  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={"4em"} mb="1em">
          <Grid item xs={12} md={6}>
            <Typography
              variant={"h1"}
              fontSize={{ xs: "30px", md: "40px" }}
              mb={"0.5em"}
            >
              Обратная связь
            </Typography>
            <Typography variant={"body2"} fontSize={{ md: "20px" }}>
              Здесь мы ответим на все вопросы, запросы, предложения и так далее.
            </Typography>
          </Grid>
        </Grid>
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
