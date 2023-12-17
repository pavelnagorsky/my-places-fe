import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

interface IPlaceFullInfoProps {
  place: IMyPlace;
}

const PlaceFullInfo = ({ place }: IPlaceFullInfoProps) => {
  return (
    <Box>
      <Divider sx={{ borderColor: "disabled", my: "1em" }} />
      <Grid
        container
        spacing={{ xs: "1em", md: "2em" }}
        justifyContent={"center"}
      >
        <Grid item xs={"auto"} md={"auto"}>
          <Typography variant={"body1"}>
            Заметок: {place.reviewsCount}
          </Typography>
        </Grid>
        <Grid item xs={"auto"} md={"auto"}>
          <Typography variant={"body1"}>
            Просмотров: {place.viewsCount}
          </Typography>
        </Grid>
        <Grid item xs={"auto"} md={"auto"}>
          <Typography variant={"body1"}>Лайков: {place.likesCount}</Typography>
        </Grid>
        <Grid item xs={"auto"} md={"auto"}>
          <Typography variant={"body1"}>
            Комментариев: {place.commentsCount}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceFullInfo;
