import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import { IPlace } from "@/services/places-service/place.interface";
import { Box, Grid, IconButton, Link, Stack, Typography } from "@mui/material";
import { MuiImage } from "@/components/UI/MuiImage/MuiImage";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import Image from "next/image";
import dynamic from "next/dynamic";
import PlaceStatistics from "@/containers/Place/PlaceStatistics";

const Gallery = dynamic(() => import("@/components/Gallery/Gallery"), {
  ssr: false,
});

interface IPlaceProps {
  place: IPlace;
}

const PlacePage = ({ place }: IPlaceProps) => {
  return (
    <WrappedContainer>
      <Grid container>
        <Grid item xs={12} md={8}>
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
                boxProps={{
                  height: "30px",
                  width: "30px",
                }}
                imageProps={{
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
          <Box mt={"2em"} mb={"1.7em"}>
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
          <Stack direction={"row"} alignItems={"center"} gap={"2em"} mb={"2em"}>
            {place.categories.map((c) => (
              <Stack
                key={c.id}
                direction={"row"}
                alignItems={"center"}
                gap={"0.5em"}
              >
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.title}
                    priority
                    height={20}
                    width={20}
                  />
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
          <Typography
            variant={"h2"}
            component={"h2"}
            fontSize={{ xs: "24px", md: "30px" }}
          >
            Комментарии
          </Typography>
        </Grid>
      </Grid>
    </WrappedContainer>
  );
};

export default PlacePage;
