import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { FormProvider } from "react-hook-form-mui";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import usePlacesSearch from "@/containers/search-page/logic/usePlacesSearch";
import Grid from "@mui/material/Grid2";
import FiltersContainer from "@/containers/search-page/content/filters/filters-container/FiltersContainer";
import OrderBySelector from "@/containers/search-page/content/filters/order-by-selector/OrderBySelector";
import FiltersContainerMobile from "@/containers/search-page/content/filters/filters-container/FiltersContainerMobile";
import MapSection from "@/containers/search-page/content/map-section/MapSection";
import CardsSection from "@/containers/search-page/content/cards-section/CardsSection";
import TotalResultsCount from "@/containers/search-page/content/cards-section/TotalResultsCount";
import SearchCartWidget from "@/components/search-cart/widgets/SearchCartWidget";

function SearchPage() {
  const { formContext, onSubmit } = usePlacesSearch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <SearchCartWidget />
      <ScrollToTopButton />
      {isMobile && (
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Box bgcolor={primaryBackground}>
            <WrappedContainer
              wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
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
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <FormProvider {...formContext}>
            <Grid container spacing={3} mt={{ xs: 0, lg: "2em" }}>
              {!isMobile && (
                <Grid size={{ xs: 0, lg: 5, xl: 4.5 }}>
                  <FiltersContainer triggerSubmit={onSubmit} />
                </Grid>
              )}
              <Grid size={{ xs: 12, lg: 7, xl: 7.5 }}>
                <MapSection />
              </Grid>
            </Grid>
          </FormProvider>
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

export default SearchPage;
