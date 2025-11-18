import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { routerLinks } from "@/routing/routerLinks";
import Link from "next/link";
import eyeImage from "/public/images/icons/eye.png";
import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";
import { useTranslation } from "next-i18next";
import utils from "@/shared/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import likeImage from "../../../../../../../../public/images/icons/heart.png";

function ExcursionCard({ excursion }: { excursion: IExcursionSearchItem }) {
  const { t } = useTranslation("excursion-management");
  const types = useExcursionTypes();
  const travelModes = useTravelModeOptions();

  const plainDescription = utils.htmlToText(excursion.description);

  const travelMode = travelModes.find((tm) => tm.id === excursion.travelMode);
  const type = types.find((type) => type.id === excursion.type);

  return (
    <Card
      sx={{
        width: { xs: "340px", md: "400px", xl: "400px" },
        height: { xs: "500px", md: "555px" },
        borderRadius: "10px",
        boxShadow: "0px 2px 22px 0px #00000012",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          position: "relative",
          height: {
            xs: 217,
            md: 250,
          },
        }}
      >
        <Carousel
          showThumbs={false}
          showIndicators={false}
          stopOnHover
          showArrows
          statusFormatter={(currentItem, total) => `${currentItem}/${total}`}
          swipeable
          swipeScrollTolerance={30}
          preventMovementUntilSwipeScrollTolerance
          emulateTouch
          infiniteLoop
        >
          {excursion.images.map((image, i) => (
            <Box
              key={i}
              sx={{
                position: "relative",
                height: {
                  xs: 217,
                  md: 250,
                },
                "& img": {
                  objectFit: "cover",
                  userSelect: "none",
                },
              }}
            >
              <Image
                priority={i === 0}
                fill
                sizes="(max-width: 900px) 330px, 374px"
                src={image || "/"}
                alt={excursion.title}
              />
            </Box>
          ))}
        </Carousel>
      </CardMedia>
      <CardActionArea
        target={"_blank"}
        component={Link}
        href={routerLinks.excursion(excursion.slug)}
        sx={{ height: "100%" }}
      >
        <CardContent
          sx={{
            px: "1.6em",
          }}
        >
          <Box
            height={{ xs: "190px", md: "204px" }}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            <Typography
              textTransform={"uppercase"}
              textAlign={"center"}
              gutterBottom
              fontSize={{ xs: "18px", md: "20px" }}
              mb={"0.5em"}
              fontWeight={700}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              sx={{
                wordWrap: "break-word",
                hyphens: "auto",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {excursion.title}
            </Typography>
            <Typography
              fontSize={{ xs: "14px", md: "16px" }}
              color={"secondary.main"}
              lineHeight={"135%"}
              mt={{ xs: "0.8em", md: 0 }}
              maxHeight={"140px"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 6,
              }}
            >
              {plainDescription}...
            </Typography>
          </Box>
          <Typography
            mb="1.2em"
            mt={{ md: "0.5em" }}
            variant="body2"
            fontSize={{ xs: "13px", md: "15px" }}
            textAlign={"center"}
            height={{ xs: "18px", md: "19px" }}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {travelMode?.label || ""} | {excursion.placesCount}{" "}
            {excursion.placesCount > 4
              ? t("search.placesPlural")
              : t("search.places")}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              flexGrow={1}
              overflow={"hidden"}
              gap={"0.5em"}
            >
              {!!type?.imageDark && (
                <Box
                  component={"img"}
                  src={type.imageDark}
                  alt={type?.label}
                  sx={{
                    objectFit: "cover",
                    width: "20px",
                    height: "20px",
                  }}
                />
              )}
              <Typography
                fontWeight={400}
                variant="body1"
                fontSize={{ xs: "14px", md: "16px" }}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                sx={{ wordBreak: "break-word" }}
              >
                {type?.label}
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={"1em"}>
              <Typography
                fontWeight={300}
                variant="body1"
                fontSize={{ xs: "13px", md: "15px" }}
                display={"flex"}
                alignItems={"center"}
                gap={"0.5em"}
              >
                <Image src={likeImage} alt={"Likes"} height={20} width={22} />
                {excursion.likesCount}
              </Typography>
              <Typography
                fontWeight={300}
                variant="body1"
                fontSize={{ xs: "13px", md: "15px" }}
                display={"flex"}
                alignItems={"center"}
                gap={"0.5em"}
              >
                <Image src={eyeImage} alt={"Views"} height={20} width={22} />
                {excursion.viewsCount}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ExcursionCard;
