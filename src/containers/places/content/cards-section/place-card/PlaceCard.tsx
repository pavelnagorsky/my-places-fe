import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import Image from "next/image";
import { routerLinks } from "@/routing/routerLinks";
import Link from "next/link";
import likeImage from "/public/images/icons/heart.png";
import locationImage from "/public/images/icons/location.png";
import eyeImage from "/public/images/icons/eye.png";
import AddToCart from "@/containers/places/content/cards-section/place-card/add-to-cart-panel/AddToCart";
import { useAppSelector } from "@/store/hooks";
import { selectCartPlaceIds } from "@/store/search-cart-slice/search-cart.slice";
import { primaryColor } from "@/styles/theme/lightTheme";
import { useTranslation } from "next-i18next";

interface IPlaceCardProps {
  place: ISearchPlace;
}

function PlaceCard({ place }: IPlaceCardProps) {
  const cardPlaceIds = useAppSelector(selectCartPlaceIds);
  const isInCart = cardPlaceIds.includes(place.id);
  const { t } = useTranslation("search");

  return (
    <Card
      sx={{
        border: isInCart ? `2px solid ${primaryColor}` : "none",
        width: { xs: "340px", md: "400px", xl: "400px" },
        height: { xs: "510px", md: "565px" },
        borderRadius: "10px",
        boxShadow: "0px 2px 22px 0px #00000012",
        position: "relative",
      }}
    >
      <AddToCart placeId={place.id} />
      <CardActionArea
        target={"_blank"}
        component={Link}
        href={routerLinks.place(place.slug)}
        sx={{ height: "100%" }}
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
          <Image
            style={{ objectFit: "cover" }}
            fill
            priority
            sizes="(max-width: 900px) 330px, 374px"
            src={place.image || "/"}
            alt={place.title || "Place image"}
          />
        </CardMedia>
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
              {place.title}
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={"0.5em"}
              mb="0.8em"
            >
              <Image
                src={locationImage}
                alt={"Location"}
                height={24}
                width={24}
              />
              <Typography
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                variant="body2"
                fontSize={{ xs: "14px", md: "16px" }}
              >
                {place.address}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              lineHeight={"135%"}
              fontSize={{ xs: "14px", md: "16px" }}
              mt={{ xs: "0.8em", md: 0 }}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
              }}
            >
              {place.description}
            </Typography>
          </Box>
          <Typography
            mb="1.2em"
            mt={{ xs: "1em", md: "1.2em" }}
            variant="body2"
            fontSize={{ xs: "13px", md: "15px" }}
            textAlign={"center"}
            height={{ xs: "18px", md: "19px" }}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {place.type.commercial
              ? t("commercialPlace")
              : place.categories.map((c) => c.title).join(" | ")}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              flexGrow={1}
              overflow={"hidden"}
              gap={"0.5em"}
            >
              <Box
                component={"img"}
                src={place.type.image as string}
                alt={place.type.title}
                sx={{
                  objectFit: "cover",
                  width: "20px",
                  height: "20px",
                }}
              />
              <Typography
                fontWeight={400}
                variant="body1"
                fontSize={{ xs: "14px", md: "16px" }}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                sx={{ wordBreak: "break-word" }}
              >
                {place.type.title}
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
                {place.likesCount}
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
                {place.viewsCount}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaceCard;
