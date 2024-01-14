import { Box, Grid, Typography } from "@mui/material";

const FavouriteItemsTableHead = () => {
  return (
    <Box mx={"0.5em"} mb={"1.5em"}>
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
          <Typography>Актуальность</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Название</Typography>
        </Grid>
        <Grid item xs={3.5}>
          <Typography>Ссылка</Typography>
        </Grid>
        <Grid item xs={"auto"} display={"flex"} alignItems={"center"}>
          <Typography>Дата добавления</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FavouriteItemsTableHead;
