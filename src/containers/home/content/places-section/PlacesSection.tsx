import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import useCardsConfig from "@/containers/home/content/places-section/logic/useCardsConfig";
import PlaceSectionCard from "@/containers/home/content/places-section/content/PlaceSectionCard";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PlacesSection = () => {
  const { t } = useTranslation("home");
  const config = useCardsConfig();

  return (
    <WrappedContainer>
      <Stack
        gap={2}
        my={{ xs: "5em", md: "8.7em" }}
        sx={{
          "& .react-multi-carousel-track": { alignItems: { sm: "end" } },
          "& .react-multi-carousel-item": {
            "&:first-of-type": {
              pl: "0",
            },
            "&:last-of-type": {
              pr: "0",
            },
            px: "0.5em",
          },
        }}
      >
        <Stack
          direction={{ md: "row" }}
          alignItems={{ md: "center" }}
          columnGap={6}
          rowGap={"1.8em"}
          mb={{ xs: 4, md: 6 }}
        >
          <Typography
            component="h2"
            sx={{
              fontWeight: 500,
              lineHeight: "120%",
              fontSize: { xs: "26px", md: "42px" },
              pb: 0,
            }}
          >
            {t("places.title")}
          </Typography>
          <Stack gap={"1.6em"}>
            <Typography fontSize={{ xs: "16px", md: "18px" }}>
              {t("places.description")}
            </Typography>
            <Box>
              <Button
                component={NextLink}
                href={routerLinks.places}
                size={"large"}
                color={"primary"}
                variant={"contained"}
                sx={{
                  borderRadius: "25px",
                  minWidth: "240px",
                  fontWeight: 600,
                  minHeight: "51px",
                }}
              >
                {t("places.button")}
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Carousel
          responsive={responsive}
          ssr
          infinite={false}
          keyBoardControl
          partialVisbile
        >
          {config.map((card, i) => (
            <PlaceSectionCard config={card} key={i} />
          ))}
        </Carousel>
      </Stack>
    </WrappedContainer>
  );
};

export default PlacesSection;

const responsive = {
  xl: {
    breakpoint: { min: 1536, max: 10000 },
    items: 4,
  },
  lg: {
    breakpoint: { min: 1200, max: 1536 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  md: {
    breakpoint: { min: 900, max: 1200 },
    items: 3,
  },
  sm: {
    breakpoint: { min: 600, max: 900 },
    items: 2,
    // partialVisibilityGutter: 30,
  },
  xs: {
    breakpoint: { min: 0, max: 600 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};
