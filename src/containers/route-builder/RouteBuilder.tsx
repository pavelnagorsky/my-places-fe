import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import useRouteBuilder from "@/containers/route-builder/content/form/logic/useRouteBuilder";
import { FormProvider } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import RouteTitle from "@/containers/route-builder/content/form/sections/RouteTitle";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Form from "@/containers/route-builder/content/form/Form";
import Details from "@/containers/route-builder/content/form/sections/Details";
import MapSection from "@/containers/route-builder/content/form/sections/MapSection";

const RouteBuilder = () => {
  const logic = useRouteBuilder();

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <FormProvider {...logic.form}>
            <Grid container spacing={4} mb={"4em"}>
              <Grid size={12}>
                <RouteTitle />
              </Grid>
              <Grid size={{ xs: 12, lg: 9 }}>
                <Form />
              </Grid>
              <Grid size={{ xs: 12, lg: 3 }}>
                <Details />
              </Grid>
              <Grid size={12}>
                <MapSection />
              </Grid>
            </Grid>
          </FormProvider>
        </motion.div>
      </WrappedContainer>
    </motion.div>
  );
};

export default RouteBuilder;
