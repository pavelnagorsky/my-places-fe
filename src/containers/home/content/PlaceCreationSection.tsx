import { useTranslation } from "next-i18next";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import placeCreationImage from "../../../../public/images/home-page/place-creation.png";

const PlaceCreationSection = () => {
  const { t } = useTranslation("home");

  const textContainer = (
    <WrappedContainer bgColor={"black"}>
      <Stack
        gap={3}
        sx={{
          position: "absolute",
          bottom: { xs: "2em", md: "5em" },
        }}
      >
        <Typography
          component="h2"
          sx={{
            zIndex: 2,
            fontWeight: 500,
            lineHeight: "127%",
            fontSize: { xs: "26px", md: "42px" },
            color: "white",
            textTransform: { sm: "uppercase" },
            width: {
              xs: "100%",
              md: "90%",
              lg: "75%",
              xl: "70%",
            },
          }}
        >
          {t("placeCreation.title")}
        </Typography>
        <Typography
          component={"h2"}
          fontSize={{ xs: "16px", md: "18px" }}
          sx={{
            zIndex: 2,
            color: "white",
            lineHeight: "130%",
            width: {
              xs: "100%",
              sm: "80%",
              md: "65%",
              lg: "50%",
            },
          }}
        >
          {t("placeCreation.description")}
        </Typography>
        <Box>
          <Button
            size={"large"}
            variant={"contained"}
            sx={{ bgcolor: "white", borderRadius: "25px", color: "#181818" }}
          >
            {t("placeCreation.button")}
          </Button>
        </Box>
      </Stack>
    </WrappedContainer>
  );

  const imageContainer = (
    <Box
      sx={{
        position: "absolute", // Changed from relative to absolute
        height: "100%",
        width: { xs: "100%", sm: "682px" }, // Full width on mobile, half on sm+
        right: 0, // Position on the right side
        top: 0,
      }}
    >
      <Image
        sizes="(max-width: 599px) 100vw, (min-width: 600px) 50vw, 990px"
        src={placeCreationImage}
        alt={t("placeCreation.title")}
        fill
        priority
        style={{ objectFit: "cover" }}
      />
    </Box>
  );

  return (
    <Box
      maxWidth={"1980px"}
      mx={"auto"}
      position={"relative"}
      height={{ xs: "753px", md: "674px" }}
      bgcolor={"black"}
    >
      {imageContainer}
      {textContainer}
    </Box>
  );
};

export default PlaceCreationSection;
