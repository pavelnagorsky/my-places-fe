import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import {
  Box,
  Grid,
  Hidden,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import Image from "next/image";
import PlaceStatistics from "@/containers/place/PlaceStatistics";
import Comments from "@/containers/place/comments/Comments";
import ReviewsSection from "@/containers/place/reviews/ReviewsSection";
import Map from "@/components/map/Map";
import { Marker } from "@react-google-maps/api";
import { Fragment } from "react";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import PlaceGallery from "@/containers/place/gallery/PlaceGallery";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchReview } from "@/services/reviews-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";

interface IPlaceProps {
  place: IPlace;
  reviews: IPaginationResponse<ISearchReview>;
}

const parseStringWithBrTags = (text: string) => {
  const sanitizedText = text || "";
  return sanitizedText.split("\n").map((article, i) => {
    return (
      <span key={i}>
        {article}
        <br />
      </span>
    );
  });
};

const PlacePage = ({ place, reviews }: IPlaceProps) => {
  const { t } = useTranslation("place");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const placeDescription = parseStringWithBrTags(place.description);

  const comments = (
    <Fragment>
      <Typography
        variant={"h2"}
        component={"h2"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        {t("comments.title")}
      </Typography>
      <Comments placeId={place.id} />
    </Fragment>
  );

  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={{ md: "3em" }} mb={"5em"}>
          <Grid item xs={12} lg={8}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Typography
                variant={"h1"}
                fontSize={{ xs: "30px", md: "35px" }}
                component={"h1"}
                mb={"0.5em"}
              >
                {place.title}
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"0.7em"}
                mb={"1em"}
              >
                <Typography
                  variant={"body2"}
                  fontSize={{ xs: "20px", md: "25px" }}
                >
                  {place.type.title}
                </Typography>
                {place.type.image && (
                  <MuiImage
                    imageProps={{
                      height: 30,
                      width: 30,
                      src: place.type.image,
                      alt: place.type.title,
                      priority: true,
                    }}
                  />
                )}
              </Stack>
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
                  {placeDescription}
                </Typography>
                {place.website && (
                  <Stack
                    direction={"row"}
                    mt={"0.7em"}
                    alignItems={"center"}
                    gap={"0.5em"}
                  >
                    <Typography
                      variant="body1"
                      fontSize={{ xs: "16px", md: "20px" }}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {t("website")}
                    </Typography>
                    <Link
                      target={"_blank"}
                      referrerPolicy={"no-referrer"}
                      href={place.website}
                      sx={{
                        fontSize: "16px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                      color={"#303030"}
                    >
                      {place.website}
                    </Link>
                  </Stack>
                )}
              </Box>
              <Typography
                variant={"h2"}
                component={"h2"}
                fontSize={{ xs: "24px", md: "30px" }}
              >
                {t("categories")}
              </Typography>
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                alignItems={"center"}
                gap={"2em"}
                mb={"2em"}
              >
                {place.categories.map((c) => (
                  <Stack
                    key={c.id}
                    direction={"row"}
                    alignItems={"center"}
                    gap={"0.5em"}
                  >
                    {c.image && (
                      <Box
                        bgcolor={"#FFE9D6"}
                        borderRadius={"5px"}
                        position={"relative"}
                        p={"0.5em"}
                        height={56}
                        width={56}
                        sx={{
                          "& img": {
                            objectFit: "cover",
                          },
                        }}
                      >
                        <Image
                          src={c.image}
                          alt={c.title}
                          priority
                          height={40}
                          width={40}
                        />
                      </Box>
                    )}
                    <Typography
                      variant={"body2"}
                      fontSize={{ xs: "16px", md: "20px" }}
                    >
                      {c.title}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Box mb={"2em"}>
                <Typography
                  variant={"h2"}
                  component={"h2"}
                  fontSize={{ xs: "24px", md: "30px" }}
                >
                  {t("location")}
                </Typography>
                <Map
                  containerStyle={{ height: isMobile ? "300px" : "400px" }}
                  fitCoordinates={[place.coordinates]}
                >
                  <Marker position={place.coordinates} />
                </Map>
                <Typography pt={"0.5em"} color={"secondary.main"}>
                  {t("coordinates.lat")} {place.coordinates.lat}
                  <Hidden smUp>
                    <br />
                  </Hidden>{" "}
                  {t("coordinates.lng")} {place.coordinates.lng}
                </Typography>
              </Box>
              <Hidden implementation="css" lgDown>
                {comments}
              </Hidden>
            </motion.div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <ReviewsSection
                placeSlug={place.slug}
                placeId={place.id}
                reviews={reviews}
              />
              <Hidden implementation="css" lgUp>
                {comments}
              </Hidden>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </WrappedContainer>
  );
};

export default PlacePage;
