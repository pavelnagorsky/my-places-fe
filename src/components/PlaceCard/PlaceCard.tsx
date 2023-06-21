import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import Image from "next/image";

interface IPlaceCardProps {
  place: ISearchPlace;
}

function PlaceCard({ place }: IPlaceCardProps) {
  return (
    <Card sx={{ width: "374px", borderRadius: "10px" }}>
      <CardActionArea>
        <CardMedia
        // component={Image}
        // height="250"
        // src={place.image}
        // alt={place.title}
        >
          <Image height={250} src={place.image} alt={place.title} width={374} />
        </CardMedia>
        <CardContent sx={{ px: "1.5em" }}>
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
            <PlaceOutlinedIcon sx={{ ml: "-0.2em", color: "#727272" }} />
            {place.address}
          </Typography>
          <Typography variant="body2" fontSize={"14px"} align={"justify"}>
            {place.description}
          </Typography>
          <Typography
            mb="1em"
            mt={"1.5em"}
            fontWeight={300}
            variant="body1"
            fontSize={"14px"}
            textAlign={"center"}
          >
            {place.categories.map((c) => c.title).join(" | ")}
          </Typography>
          <Divider variant={"middle"} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaceCard;
