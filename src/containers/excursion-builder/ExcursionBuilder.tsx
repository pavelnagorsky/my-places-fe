import useExcursionBuilder from "@/containers/excursion-builder/content/form/logic/useExcursionBuilder";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { FormProvider, useFieldArray } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Form from "@/containers/excursion-builder/content/form/Form";
import MapSection from "./content/map-section/MapSection";
import Details from "@/containers/excursion-builder/content/details/Details";
import { useTranslation } from "next-i18next";
import ProtectedAuth from "@/hoc/ProtectedAuth";

const ExcursionBuilder = () => {
  const { t } = useTranslation("excursion-management");
  const form = useExcursionBuilder();

  return (
    <ProtectedAuth mode={"redirectAfter"}>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <WrappedContainer>
          <FormProvider {...form}>
            <Stack mb={2}>
              <Breadcrumbs />
            </Stack>
            <Grid container spacing={4} mb={"4em"}>
              <Grid size={{ xs: 12, lg: 9 }}>
                <motion.div variants={animationVariants.defaultItemVariant}>
                  <Typography variant={"h1"} mb={3}>
                    {t("seo.create.title")}
                  </Typography>
                  <Form />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 12, lg: 3 }}>
                <Details />
              </Grid>
              <Grid size={12}>
                <motion.div variants={animationVariants.defaultItemVariant}>
                  <MapSection />
                </motion.div>
              </Grid>
            </Grid>
          </FormProvider>
        </WrappedContainer>
      </motion.div>
    </ProtectedAuth>
  );
};

export default ExcursionBuilder;
