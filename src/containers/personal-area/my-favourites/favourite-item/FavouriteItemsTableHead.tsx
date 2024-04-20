import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const FavouriteItemsTableHead = () => {
  const { t } = useTranslation("personal-area");
  return (
    <Box ml={"1em"} mb={"1.5em"}>
      <Grid
        container
        spacing={"1em"}
        fontSize={"14px"}
        textTransform={"uppercase"}
        alignItems={"center"}
        sx={{
          "& p": { fontWeight: 700, fontSize: "12px", color: "secondary.main" },
        }}
      >
        <Grid item xs={2}>
          <Typography>{t("favourites.headings.actuality")}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{t("favourites.headings.place")}</Typography>
        </Grid>
        <Grid item xs={3.5}>
          <Typography>{t("favourites.headings.link")}</Typography>
        </Grid>
        <Grid item xs={"auto"} display={"flex"} alignItems={"center"}>
          <Typography>{t("favourites.headings.date")}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FavouriteItemsTableHead;
