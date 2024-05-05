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
import { ISearchPlace } from "@/services/places-service/interfaces/search-place.interface";
import Image from "next/image";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import { memo } from "react";
import Link from "next/link";
import { routerLinks } from "@/routing/routerLinks";

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
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)",
      }}
    >
      <CardActionArea component={Link} href={routerLinks.place(place.slug)}>
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
            background: "linear-gradient(180deg, #FFF 0%, #FFF2E6 100%)",
          }}
        >
          <Box
            height={{ xs: "173px", md: "183px" }}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            <Typography
              textTransform={"uppercase"}
              textAlign={"center"}
              gutterBottom
              mb={{ xs: "0.6em", md: "0.7em" }}
              fontSize={{ xs: "16px", md: "17px" }}
              fontWeight={700}
              //height={"23.4px"}
              maxHeight={"44.2px"}
              overflow={"hidden"}
              //whiteSpace={"nowrap"}
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
              overflow={"hidden"}
              direction={"row"}
              alignItems={"center"}
              height={{ xs: "33px", md: "35px" }}
              gap={"0.5em"}
              mb="0.8em"
              maxHeight={{ xs: "33px", md: "35px" }}
            >
              <PlaceOutlinedIcon
                sx={{ ml: "-0.1em", color: secondaryLightColor }}
              />
              <Typography
                fontWeight={300}
                overflow={"hidden"}
                maxHeight={{ xs: "33px", md: "35px" }}
                textOverflow={"ellipsis"}
                variant="body2"
                fontSize={{ xs: "13px", md: "14px" }}
                align={"justify"}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {place.address}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              lineHeight={"135%"}
              fontSize={{ xs: "13px", md: "14px" }}
              align={"justify"}
              my={{ xs: "16px", md: 0 }}
              // height={{ xs: "88px", md: "95px" }}
              // maxHeight={{ xs: "88px", md: "95px" }}
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
            mt={{ xs: "0.8em", md: "1.2em" }}
            fontWeight={300}
            variant="body1"
            fontSize={{ xs: "13px", md: "14px" }}
            textAlign={"center"}
            height={{ xs: "18px", md: "19px" }}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {place.categories.map((c) => c.title).join(" | ")}
          </Typography>
          <Divider variant={"middle"} />
          <Stack
            direction={"row"}
            mt={{ xs: "1em", md: "1.2em" }}
            mb="0.3em"
            alignItems={"center"}
            gap={"0.5em"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              flexGrow={1}
              overflow={"hidden"}
              gap={"0.5em"}
            >
              <Typography
                fontWeight={400}
                variant="body2"
                fontSize={"14px"}
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
                variant="body2"
                fontSize={"14px"}
                display={"flex"}
                alignItems={"center"}
                gap={"0.5em"}
              >
                <FavoriteBorderIcon sx={{ color: secondaryLightColor }} />
                {place.likesCount}
              </Typography>
              <Typography
                fontWeight={300}
                variant="body2"
                fontSize={"14px"}
                display={"flex"}
                alignItems={"center"}
                gap={"0.5em"}
              >
                <VisibilityOutlinedIcon sx={{ color: secondaryLightColor }} />
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
