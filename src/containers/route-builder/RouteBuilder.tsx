import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import useRouteBuilder from "@/containers/route-builder/content/form/logic/useRouteBuilder";
import { FormProvider } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import RouteTitle from "@/containers/route-builder/content/form/sections/RouteTitle";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Details from "@/containers/route-builder/content/form/sections/Details";
import MapSection from "@/containers/route-builder/content/form/sections/map-section/MapSection";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Stack } from "@mui/material";

const Form = dynamic(
  () => import("@/containers/route-builder/content/form/Form"),
  {
    ssr: false,
  }
);

const RouteBuilder = () => {
  const form = useRouteBuilder();

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer>
        <FormProvider {...form}>
          <Grid container spacing={4} mb={"4em"}>
            <Grid size={12}>
              <motion.div variants={animationVariants.defaultItemVariant}>
                <Stack mb={3}>
                  <Breadcrumbs />
                </Stack>
                <RouteTitle />
              </motion.div>
            </Grid>
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

export default RouteBuilder;
