import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CastleOutlinedIcon from "@mui/icons-material/CastleOutlined";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import Image from "next/image";
import { secondaryLightColor } from "@/styles/theme/lightTheme";

interface IPlaceCardProps {
  place: ISearchPlace;
}

function PlaceCard({ place }: IPlaceCardProps) {
  //const isMobile = useMediaQuery();

  return (
    <Card
      sx={{
        width: { xs: "345px", md: "374px" },
        height: { xs: "517px", md: "568px" },
        borderRadius: "10px",
        boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.50)",
      }}
    >
      <CardActionArea>
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
            sizes="(max-width: 900px) 345px, 374px"
            src={place.image}
            alt={place.title}
          />
        </CardMedia>
        <CardContent
          sx={{
            px: "1.6em",
            background: "linear-gradient(180deg, #FFF 0%, #FFF2E6 100%)",
          }}
        >
          <Typography
            textTransform={"uppercase"}
            textAlign={"center"}
            gutterBottom
            mb={{ xs: "0.6em", md: "1em" }}
            fontSize={{ xs: "16px", md: "18px" }}
            fontWeight={700}
            height={"23.4px"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {place.title}
          </Typography>
          <Typography
            mb="1em"
            fontWeight={300}
            height={"37px"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            variant="body2"
            fontSize={{ xs: "13px", md: "14px" }}
            display={"flex"}
            alignItems={"flex-start"}
            gap={"0.5em"}
            align={"justify"}
          >
            <PlaceOutlinedIcon
              sx={{ ml: "-0.1em", color: secondaryLightColor }}
            />
            {place.address}
          </Typography>
          <Typography
            variant="body2"
            lineHeight={"135%"}
            fontSize={{ xs: "13px", md: "14px" }}
            align={"justify"}
            height={"95px"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {place.description}
          </Typography>
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
          >
            {place.categories.map((c) => c.title).join(" | ")}
          </Typography>
          <Divider variant={"middle"} />
          <Stack
            direction={"row"}
            mt="1.4em"
            mb="0.2em"
            alignItems={"center"}
            gap={"0.5em"}
          >
            <Typography
              fontWeight={300}
              variant="body2"
              fontSize={"14px"}
              display={"flex"}
              alignItems={"center"}
              flexGrow={1}
              gap={"0.5em"}
            >
              {place.type.title}
              <CastleOutlinedIcon sx={{ color: secondaryLightColor }} />
            </Typography>
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
                {place.viewsCount}
              </Typography>
              <Typography
                fontWeight={300}
                variant="body2"
                fontSize={"14px"}
                display={"flex"}
                alignItems={"center"}
                gap={"0.2em"}
              >
                <VisibilityOutlinedIcon sx={{ color: secondaryLightColor }} />
                {place.likesCount}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaceCard;