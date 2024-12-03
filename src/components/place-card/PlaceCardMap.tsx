import { Box, Card, CardMedia, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { routerLinks } from "@/routing/routerLinks";
import Grid from "@mui/material/Grid2";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";

const PlaceCardMap = ({ place }: { place: ISearchPlace }) => {
  const actionButton = (
    <Button
      href={routerLinks.place(place.slug)}
      target="_blank"
      variant={"contained"}
      fullWidth
      sx={{ textTransform: "none" }}
      size={"small"}
      endIcon={<ArrowRightAltIcon sx={{ color: "white" }} />}
    >
      Узнать больше
    </Button>
  );

  return (
    <Grid
      container
      sx={{
        width: { xs: "100%", md: "432px" },
        maxHeight: "200px",
        scrollbarWidth: "thin",
        overflow: "auto",
      }}
    >
      <Grid size={{ xs: 0, md: 6 }}>
        <MuiImage
          imageProps={{
            fill: true,
            src: place.image ?? "/none",
            alt: place.title,
          }}
          boxProps={{
            sx: {
              mb: "-1em",
              objectFit: "cover",
              height: "100%",
              maxHeight: "200px",
              width: "100%",
            },
          }}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        p={2}
        pb={0}
        sx={{ maxHeight: "200px", scrollbarWidth: "thin", overflowX: "auto" }}
      >
        <Typography fontSize={"16px"} fontWeight={500} mb={"0.5em"}>
          {place.title}
        </Typography>
        <Typography
          fontWeight={300}
          variant="body1"
          fontSize={"14px"}
          mb={"1em"}
        >
          {place.categories.map((c) => c.title).join(" | ")}
        </Typography>
        <Typography
          fontWeight={500}
          variant="body2"
          fontSize={"14px"}
          display={"flex"}
          alignItems={"center"}
          flexGrow={1}
          sx={{ wordBreak: "break-word" }}
          gap={"0.5em"}
          mb={"1em"}
        >
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
          {place.type.title}
        </Typography>
        <Box
          position={"sticky"}
          bgcolor={"white"}
          bottom={0}
          zIndex={1}
          py={"1em"}
        >
          {actionButton}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PlaceCardMap;
