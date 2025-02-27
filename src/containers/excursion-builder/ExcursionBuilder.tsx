import useExcursionBuilder from "@/containers/excursion-builder/content/form/logic/useExcursionBuilder";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { FormProvider } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Form from "@/containers/excursion-builder/content/form/Form";
import MapSection from "./content/map-section/MapSection";
import Details from "@/containers/excursion-builder/content/details/Details";

const ExcursionBuilder = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const form = useExcursionBuilder();

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer>
        <FormProvider {...form}>
          <Grid container spacing={4} mb={"4em"}>
            {!isMobile && (
              <Grid size={12}>
                <motion.div variants={animationVariants.defaultItemVariant}>
                  <Stack mb={3}>
                    <Breadcrumbs />
                  </Stack>
                </motion.div>
              </Grid>
            )}
            <Grid size={{ xs: 12, lg: 9 }}>
              <motion.div variants={animationVariants.defaultItemVariant}>
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
  );
};

export default ExcursionBuilder;
