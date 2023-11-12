import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import { IPlace } from "@/services/places-service/place.interface";
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
import { MuiImage } from "@/components/UI/MuiImage/MuiImage";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import Image from "next/image";
import PlaceStatistics from "@/containers/Place/PlaceStatistics";
import Comments from "@/containers/Place/Comments/Comments";
import ReviewsSection from "@/containers/Place/Reviews/ReviewsSection";
import { ISearchReviewsResponse } from "@/services/reviews-service/interfaces";
import Gallery from "@/components/Gallery/Gallery";
import Map from "@/components/Map/Map";
import { Marker } from "@react-google-maps/api";
import { Fragment } from "react";

interface IPlaceProps {
  place: IPlace;
  reviews: ISearchReviewsResponse;
}

const PlacePage = ({ place, reviews }: IPlaceProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const comments = (
    <Fragment>
      <Typography
        variant={"h2"}
        component={"h2"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        Комментарии
      </Typography>
      <Comments placeId={place.id} />
    </Fragment>
  );

  return (
    <WrappedContainer>
      <Grid container spacing={{ md: "3em" }} mb={"5em"}>
        <Grid item xs={12} lg={8}>
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
            gap={"0.5em"}
            mb={"1em"}
          >
            <Typography variant={"body2"} fontSize={{ xs: "20px", md: "25px" }}>
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
            <Gallery
              mobileHeight={250}
              laptopHeight={380}
              desktopHeight={480}
              sx={{
                "& .indicators": {
                  mt: { md: "1em" },
                  "& button": {
                    position: "relative",
                    zIndex: 3,
                  },
                },
              }}
              images={place.images.map((image) => ({
                src: image,
                alt: place.title,
              }))}
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
            Описание
          </Typography>
          <Box mb={"2em"}>
            <Typography variant="body2" fontSize={{ xs: "16px", md: "20px" }}>
              {place.description}
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
                >
                  Веб-сайт:
                </Typography>
                <Link
                  target={"_blank"}
                  referrerPolicy={"no-referrer"}
                  href={place.website}
                  sx={{
                    wordWrap: "break-word",
                    fontSize: "16px",
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
            Категории
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
              Местоположение
            </Typography>
            <Map
              containerStyle={{ height: isMobile ? "300px" : "400px" }}
              fitCoordinates={[place.coordinates]}
            >
              <Marker position={place.coordinates} />
            </Map>
          </Box>
          <Hidden implementation="css" mdDown>
            {comments}
          </Hidden>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ReviewsSection placeId={place.id} reviews={reviews} />
          <Hidden implementation="css" mdUp>
            {comments}
          </Hidden>
        </Grid>
      </Grid>
    </WrappedContainer>
  );
};

export default PlacePage;
