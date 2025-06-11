import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useCardsConfig from "./logic/useCardsConfig";
import ExcursionsSectionCard from "@/containers/home/content/excursions-section/content/ExcursionsSectionCard";

const ExcursionsSection = () => {
  const { t } = useTranslation("home");
  const config = useCardsConfig();

  return (
    <WrappedContainer>
      <Stack
        gap={6}
        my={{ xs: "5em", md: "8.7em" }}
        sx={{
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
          direction={{ sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent={{ sm: "space-between" }}
          gap={3.2}
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
            {t("excursions.title")}
          </Typography>
          <Box>
            <Button
              component={NextLink}
              href={routerLinks.excursions}
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
              {t("excursions.button")}
            </Button>
          </Box>
        </Stack>
        <Carousel
          responsive={responsive}
          ssr
          infinite={false}
          keyBoardControl
          partialVisbile
        >
          {config.map((card, i) => (
            <ExcursionsSectionCard config={card} key={i} />
          ))}
        </Carousel>
      </Stack>
    </WrappedContainer>
  );
};

export default ExcursionsSection;

const responsive = {
  xl: {
    breakpoint: { min: 1536, max: 10000 },
    items: 3,
  },
  lg: {
    breakpoint: { min: 1200, max: 1536 },
    items: 3,
  },
  md: {
    breakpoint: { min: 900, max: 1200 },
    items: 2,
    partialVisibilityGutter: 80,
  },
  sm: {
    breakpoint: { min: 600, max: 900 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  xs: {
    breakpoint: { min: 0, max: 600 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};
