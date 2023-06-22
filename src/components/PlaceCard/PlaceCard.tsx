import {
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
import CastleOutlinedIcon from "@mui/icons-material/CastleOutlined";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import Image from "next/image";
import { secondaryLightColor } from "@/styles/theme/lightTheme";

interface IPlaceCardProps {
  place: ISearchPlace;
}

function PlaceCard({ place }: IPlaceCardProps) {
  return (
    <Card
      sx={{
        width: "374px",
        borderRadius: "10px",
        boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.50)",
      }}
    >
      <CardActionArea>
        <CardMedia>
          <Image height={250} src={place.image} alt={place.title} width={374} />
        </CardMedia>
        <CardContent sx={{ px: "1.6em" }}>
          <Typography
            textTransform={"uppercase"}
            textAlign={"center"}
            gutterBottom
            mb={"1em"}
            fontSize={"18px"}
            fontWeight={700}
          >
            {place.title}
          </Typography>
          <Typography
            mb="1em"
            fontWeight={300}
            variant="body2"
            fontSize={"14px"}
            display={"flex"}
            alignItems={"flex-start"}
            gap={"0.5em"}
            align={"justify"}
          >
            <PlaceOutlinedIcon
              sx={{ ml: "-0.2em", color: secondaryLightColor }}
            />
            {place.address}
          </Typography>
          <Typography
            variant="body2"
            lineHeight={"135%"}
            fontSize={"14px"}
            align={"justify"}
          >
            {place.description}
          </Typography>
          <Typography
            mb="1.2em"
            mt={"1.2em"}
            fontWeight={300}
            variant="body1"
            fontSize={"14px"}
            textAlign={"center"}
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
