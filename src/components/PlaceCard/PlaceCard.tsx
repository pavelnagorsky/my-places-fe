import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { ISearchPlace } from "@/services/places-service/search-place.interface";

interface IPlaceCardProps {
  place: ISearchPlace;
}

function PlaceCard({ place }: IPlaceCardProps) {
  return (
    <Card sx={{ width: "374px", borderRadius: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={place.image}
          alt={place.title}
        />
        <CardContent>
          <Typography
            textAlign={"center"}
            gutterBottom
            variant="h3"
            component="p"
          >
            {place.title}
          </Typography>
          <Typography
            variant="body2"
            fontSize={"12px"}
            display={"flex"}
            alignItems={"flex-start"}
          >
            <RoomIcon />
            {place.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaceCard;
