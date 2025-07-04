import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { FormContainer, FormProvider } from "react-hook-form-mui";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import usePlacesSearch from "@/containers/places/logic/usePlacesSearch";
import Grid from "@mui/material/Grid2";
import FiltersContainer from "@/containers/places/content/filters/filters-container/FiltersContainer";
import OrderBySelector from "@/containers/places/content/filters/order-by-selector/OrderBySelector";
import FiltersContainerMobile from "@/containers/places/content/filters/filters-container/FiltersContainerMobile";
import MapSection from "@/containers/places/content/map-section/MapSection";
import CardsSection from "@/containers/places/content/cards-section/CardsSection";
import TotalResultsCount from "@/containers/places/content/cards-section/TotalResultsCount";
import SearchCartWidget from "@/components/search-cart/widgets/SearchCartWidget";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

function PlacesPage() {
  const { formContext, onSubmit } = usePlacesSearch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" } }}
      >
        <Stack mb={2} display={{ xs: "none", md: "flex" }}>
          <Breadcrumbs />
        </Stack>
      </WrappedContainer>
      <SearchCartWidget />
      <ScrollToTopButton />
      {isMobile && (
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Box bgcolor={primaryBackground}>
            <WrappedContainer
              wrapperSx={{
                px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" },
              }}
              bgColor={primaryBackground}
            >
              <FormProvider {...formContext}>
                <FiltersContainerMobile triggerSubmit={onSubmit} />
              </FormProvider>
            </WrappedContainer>
          </Box>
        </motion.div>
      )}
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" } }}
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <FormContainer formContext={formContext} onSuccess={() => onSubmit()}>
            <Grid container spacing={3} mt={{ xs: 0, lg: "2em" }}>
              {!isMobile && (
                <Grid size={{ xs: 0, lg: 5, xl: 4.5 }}>
                  <FiltersContainer />
                </Grid>
              )}
              <Grid size={{ xs: 12, lg: 7, xl: 7.5 }}>
                <MapSection />
              </Grid>
            </Grid>
          </FormContainer>
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Stack
            direction={{ md: "row" }}
            alignItems={{ md: "center" }}
            justifyContent={{ md: "space-between" }}
            gap={"1em"}
            my={{ xs: "1.5em", md: "2em" }}
          >
            <TotalResultsCount />
            <FormProvider {...formContext}>
              <OrderBySelector triggerSubmit={onSubmit} />
            </FormProvider>
          </Stack>
          <CardsSection onSubmit={onSubmit} />
        </motion.div>
      </WrappedContainer>
    </motion.div>
  );
}

export default PlacesPage;
