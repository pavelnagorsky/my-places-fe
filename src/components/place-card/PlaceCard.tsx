import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import Image from "next/image";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import { routerLinks } from "@/routing/routerLinks";
import Link from "next/link";
import likeImage from "/public/images/icons/heart.png";
import locationImage from "/public/images/icons/location.png";
import eyeImage from "/public/images/icons/eye.png";

interface IPlaceCardProps {
  place: ISearchPlace;
}

function PlaceCard({ place }: IPlaceCardProps) {
  return (
    <Card
      sx={{
        width: { xs: "330px", md: "374px" },
        height: { xs: "510px", md: "565px" },
        borderRadius: "10px",
        boxShadow: "0px 2px 22px 0px #00000012",
      }}
    >
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
            {place.categories.map((c) => c.title).join(" | ")}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              flexGrow={1}
              overflow={"hidden"}
              gap={"0.5em"}
            >
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
