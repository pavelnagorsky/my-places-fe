import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import { Fragment } from "react";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import PlaceType from "./content/PlaceType";
import TextWithBrTags from "@/components/UI/text-with-br-tags/TextWithBrTags";
import PlaceCategories from "@/containers/place/content/PlaceCategories";
import PlaceGallery from "@/containers/place/content/gallery/PlaceGallery";
import PlaceWebsite from "@/containers/place/content/PlaceWebsite";
import { ISearchReview } from "@/services/reviews-service/interfaces/interfaces";
import { IPaginationResponse } from "@/services/interfaces";
import ReviewsSection from "./content/reviews/ReviewsSection";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";

const SearchCartWidget = dynamic(
  () => import("@/components/search-cart/widgets/SearchCartWidget"),
  { ssr: false }
);
const AddToCartWidget = dynamic(
  () => import("@/components/search-cart/widgets/AddToCartWidget"),
  { ssr: false }
);
const PlaceStatistics = dynamic(
  () => import("@/containers/place/content/statistics/PlaceStatistics"),
  { ssr: false }
);
const PlaceComments = dynamic(
  () => import("@/containers/place/content/comments/Comments"),
  { ssr: false }
);
const MapSection = dynamic(() => import("./content/MapSection"), {
  ssr: false,
});

export interface IPlacePageProps {
  place: IPlace;
  reviews: IPaginationResponse<ISearchReview>;
}

const PlacePage = ({ place, reviews }: IPlacePageProps) => {
  const { t } = useTranslation("place");

  const comments = (
    <Fragment>
      <Typography
        variant={"h2"}
        component={"h2"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        {t("comments.title", { ns: "common" })}
      </Typography>
      <PlaceComments
        entityId={place.id}
        entityType={StatisticEntitiesEnum.Place}
      />
    </Fragment>
  );

  return (
    <WrappedContainer>
      <AddToCartWidget placeId={place.id} />
      <SearchCartWidget sx={{ bottom: 32 }} />
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={{ md: "3em" }} mb={"3em"}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Typography
                variant={"h1"}
                fontSize={{ xs: "27px", md: "35px" }}
                component={"h1"}
                mb={"0.5em"}
              >
                {place.title}
              </Typography>
              <PlaceType type={place.type} />
              <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
                <PlaceOutlinedIcon
                  sx={{ ml: "-0.1em", color: secondaryLightColor }}
                />
                <Typography
                  fontWeight={300}
                  variant="body2"
                  fontSize={{ xs: "18px", md: "20px" }}
                >
                  {place.address}
                </Typography>
              </Stack>
              <Box mt={"2em"} mb={{ xs: "1em", md: "1.5em" }}>
                <PlaceGallery
                  images={place.images.map((image) => ({
                    src: image,
                    alt: place.title,
                  }))}
                  mobileHeight={250}
                  laptopHeight={380}
                  desktopHeight={480}
                />
                <PlaceStatistics
                  views={place.viewsCount}
                  initialLikesCount={place.likesCount}
                  createdAt={place.createdAt}
                  placeId={place.id}
                />
              </Box>
              <Typography
                variant={"h2"}
                component={"h2"}
                pb={"0.5em"}
                fontSize={{ xs: "24px", md: "30px" }}
              >
                {t("description")}
              </Typography>
              <Box mb={"2em"}>
                <Typography
                  variant="body2"
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  <TextWithBrTags text={place.description} />
                </Typography>
                {place.website && <PlaceWebsite website={place.website} />}
              </Box>
              <PlaceCategories categories={place.categories} />
              <MapSection place={place} />
              <Box display={{ xs: "none", lg: "block" }}>{comments}</Box>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <ReviewsSection
                placeSlug={place.slug}
                placeId={place.id}
                reviews={reviews}
              />
              <Box display={{ lg: "none" }}>{comments}</Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </WrappedContainer>
  );
};

export default PlacePage;
