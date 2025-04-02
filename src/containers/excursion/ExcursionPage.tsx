import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import PlaceGallery from "@/containers/place/gallery/PlaceGallery";
import ExcursionStatistics from "@/containers/excursion/content/ExcursionStatistics";
import ExcursionDescription from "@/containers/excursion/content/ExcursionDescription";
import ExcursionDetails from "@/containers/excursion/content/ExcursionDetails";
import ExcursionMapSection from "@/containers/excursion/content/map-section/ExcursionMapSection";
import ExcursionPlaces from "@/containers/excursion/content/excursion-places/ExcursionPlaces";
import ExcursionContent from "@/containers/excursion/content/ExcursionContent";

const ExcursionPage = ({ excursion }: { excursion: IExcursion }) => {
  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Stack mb={2} display={{ xs: "none", md: "flex" }}>
          <Breadcrumbs customEnding={excursion.title} />
        </Stack>
        <Box mb={8}>
          <ExcursionContent excursion={excursion} />
        </Box>
      </motion.div>
    </WrappedContainer>
  );
};

export default ExcursionPage;
