import { useTranslation } from "next-i18next";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import placeCreationImage from "../../../../public/images/home-page/place-creation.png";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";

const PlaceCreationSection = () => {
  const { t } = useTranslation("home");

  const textContainer = (
    <WrappedContainer bgColor={"black"}>
      <Stack
        gap={"2.5em"}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translate(0, -50%)",
          width: {
            xs: "100%",
            sm: "80%",
            md: "50%",
            lg: "30%",
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            zIndex: 2,
            fontWeight: 500,
            lineHeight: "120%",
            fontSize: { xs: "26px", md: "42px" },
            color: "white",
          }}
        >
          {t("placeCreation.title")}
          <br />
          {t("placeCreation.subTitle")}
        </Typography>
        <Typography
          component={"p"}
          fontSize={{ xs: "16px", md: "18px" }}
          sx={{
            zIndex: 2,
            color: "white",
            lineHeight: "135%",
          }}
        >
          {t("placeCreation.description")}
        </Typography>
        <Box mt={"1.25em"}>
          <Button
            component={NextLink}
            href={routerLinks.createPlace}
            size={"large"}
            variant={"contained"}
            sx={{
              bgcolor: "white",
              borderRadius: "25px",
              minWidth: "240px",
              fontWeight: 600,
              minHeight: "51px",
              color: "#181818",
            }}
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
      bgcolor={"#181818"}
    >
      {imageContainer}
      {textContainer}
    </Box>
  );
};

export default PlaceCreationSection;
