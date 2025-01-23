import { useTranslation } from "next-i18next";
import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { FormProvider } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import RouteTitle from "@/containers/route-builder/content/form/sections/RouteTitle";
import Details from "@/containers/route-builder/content/form/sections/Details";
import MapSection from "@/containers/route-builder/content/form/sections/map-section/MapSection";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import useEditMyRoute from "@/containers/personal-area/my-routes/edit-route/logic/useEditMyRoute";

const Form = dynamic(
  () => import("@/containers/route-builder/content/form/Form"),
  {
    ssr: false,
  }
);

const EditRoute = () => {
  const { t } = useTranslation(["review-management", "common"]);
  const { form, loading, onGoBack } = useEditMyRoute();

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <PersonalAreaLayout>
      {loader}
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <FormProvider {...form}>
          <Grid container spacing={4} mb={"4em"}>
            <Grid size={12}>
              <motion.div variants={animationVariants.defaultItemVariant}>
                <RouteTitle editMode />
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
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default EditRoute;
