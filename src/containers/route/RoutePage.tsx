import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { FormProvider } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import RouteTitle from "@/containers/route-builder/content/form/sections/RouteTitle";
import Details from "@/containers/route-builder/content/details/Details";
import MapSection from "@/containers/route-builder/content/map-section/MapSection";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import useRouteView from "@/containers/route/logic/useRouteView";
import { NextSeo } from "next-seo";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const Form = dynamic(
  () => import("@/containers/route-builder/content/form/Form"),
  {
    ssr: false,
  }
);

const RoutePage = () => {
  const { t } = useTranslation("common");
  const { form, loading, seoData } = useRouteView();
  const { canonical, alternateLinks } = useAlternateLinks();

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <WrappedContainer>
      <NextSeo
        title={seoData?.title || t("links.routeBuilder")}
        description={seoData?.description}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: seoData?.title || t("links.routeBuilder"),
          description: seoData?.description,
        }}
      />
      {loader}
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <FormProvider {...form}>
          <Grid container spacing={4} mb={"2em"}>
            <Grid size={12}>
              <motion.div variants={animationVariants.defaultItemVariant}>
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
      </motion.div>
    </WrappedContainer>
  );
};

export default RoutePage;
