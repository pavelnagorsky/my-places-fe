import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "next-i18next";

interface IPlaceFullInfoProps {
  place: IMyPlace;
}

const PlaceFullInfo = ({ place }: IPlaceFullInfoProps) => {
  const { t } = useTranslation("personal-area");
  return (
    <Box>
      <Divider sx={{ borderColor: "disabled", my: "1em" }} />
      <Grid
        container
        spacing={{ xs: "1em", md: "2em" }}
        justifyContent={{ xs: "start", sm: "center" }}
      >
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("places.headings.reviewsCount")} {place.reviewsCount}
          </Typography>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("places.headings.viewsCount")} {place.viewsCount}
          </Typography>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("places.headings.likesCount")} {place.likesCount}
          </Typography>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("places.headings.commentsCount")} {place.commentsCount}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceFullInfo;
