import { useTranslation } from "next-i18next";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import {
  Box,
  Button,
  darken,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import placeCreationImage from "../../../../public/images/home-page/place-creation/place-creation.png";
import placeCreationXsImage from "../../../../public/images/home-page/place-creation/place-creation-xs.png";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";

const PlaceCreationSection = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const isXlPlus = useMediaQuery(theme.breakpoints.up(1676));

  const textContainer = (
    <WrappedContainer>
      <Stack
        gap={{ xs: "2em", sm: "2.5em" }}
        sx={{
          position: "absolute",
          top: { xs: "5%", md: "50%" },
          transform: { md: "translate(0, -50%)" },
          width: {
            // xs: "100%",
            sm: "80%",
            md: "50%",
            lg: "39%",
            xl: isXlPlus ? "25%" : "30%",
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
        <Box mt={{ md: "1.25em" }}>
          <Button
            component={NextLink}
            href={routerLinks.createPlace}
            size={"large"}
            variant={"contained"}
            sx={{
              bgcolor: "white",
              "&:hover": {
                bgcolor: darken("#FFFFFF", 0.2),
              },
              borderRadius: "25px",
              minWidth: "240px",
              fontWeight: 600,
              minHeight: "51px",
              color: "secondary.dark",
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
        display: { xs: "none", md: "block" },
        position: "absolute",
        height: "100%",
        width: "682px",
        right: { md: "-150px", lg: 0 },
        top: 0,
      }}
    >
      <Image
        sizes="(max-width: 876px) 100vw, 990px"
        src={placeCreationImage}
        alt={t("placeCreation.title")}
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "right center" }}
      />
    </Box>
  );

  const imageContainerXs = (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        position: "absolute",
        height: { xs: "350px", sm: "410px" },
        width: "100%",
        bottom: 0,
        right: 0,
      }}
    >
      <Image
        sizes="(max-width: 876px) 100vw, 990px"
        src={placeCreationXsImage}
        alt={t("placeCreation.title")}
        fill
        style={{ objectFit: "cover", objectPosition: "right top" }}
      />
    </Box>
  );

  return (
    <Box
      overflow={"hidden"}
      maxWidth={"1980px"}
      mx={"auto"}
      position={"relative"}
      height={{ xs: "753px", md: "674px" }}
      bgcolor={"secondary.dark"}
    >
      {imageContainer}
      {imageContainerXs}
      {textContainer}
    </Box>
  );
};

export default PlaceCreationSection;
