import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import PlaceGallery from "@/containers/place/gallery/PlaceGallery";
import ExcursionStatistics from "@/containers/excursion/content/ExcursionStatistics";
import ExcursionDescription from "@/containers/excursion/content/ExcursionDescription";
import ExcursionDetails from "@/containers/excursion/content/ExcursionDetails";
import ExcursionMapSection from "@/containers/excursion/content/map-section/ExcursionMapSection";
import ExcursionPlaces from "@/containers/excursion/content/excursion-places/ExcursionPlaces";

const ExcursionPage = ({ excursion }: { excursion: IExcursion }) => {
  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Stack mb={2}>
          <Breadcrumbs customEnding={excursion.title} />
        </Stack>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant={"h1"}
              fontSize={{ xs: "27px", md: "35px" }}
              component={"h1"}
              mb={0}
            >
              {excursion.title}
            </Typography>
          </Grid>
          <Grid size={12}>
            <PlaceGallery
              images={excursion.images.map((image, i) => ({
                src: image,
                alt: excursion.places[i]?.title || excursion.title,
              }))}
              mobileHeight={250}
              laptopHeight={380}
              desktopHeight={480}
            />
            <ExcursionStatistics
              views={excursion.viewsCount}
              createdAt={excursion.createdAt}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack gap={2}>
              <ExcursionDescription description={excursion.description} />
              <ExcursionPlaces items={excursion.places} />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ExcursionDetails excursion={excursion} />
          </Grid>
          <Grid size={12}>
            <ExcursionMapSection excursion={excursion} />
          </Grid>
        </Grid>
      </motion.div>
    </WrappedContainer>
  );
};

export default ExcursionPage;
