import { Box, Stack, SxProps, Typography } from "@mui/material";
import { CSSProperties, memo } from "react";
import Image from "next/image";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import mainImage from "../../../../public/images/home-page/main-image.jpg";
import overlayImage from "../../../../public/images/home-page/overlay-image.svg";
import { useTranslation } from "next-i18next";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";

function TextAndMainImage() {
  const { t } = useTranslation("home");
  const imageContainerSx: SxProps = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  const imageStyle: CSSProperties = {
    objectFit: "cover",
  };

  // main picture
  const mainImageContainer = (
    <Box sx={imageContainerSx}>
      <Image
        sizes="(max-width: 1980px) 100vw, 1980px"
        src={mainImage}
        alt={t("mainSection.title")}
        fill
        priority
        style={imageStyle}
      />
    </Box>
  );

  // overlay picture
  const overlayImageContainer = (
    <Box
      position={"absolute"}
      top={0}
      right={0}
      width={{ xs: "100%", lg: "1114px" }}
      height={{ xs: "300px", sm: "360px", md: "480px", lg: "460px" }}
      zIndex={1}
    >
      <Image
        sizes="100vw"
        src={overlayImage}
        alt={"Маршруты"}
        fill
        priority
        style={imageStyle}
      />
    </Box>
  );

  // text for main picture
  const mainText = (
    <WrappedContainer>
      <Stack
        gap={3}
        sx={{
          position: "absolute",
          bottom: { xs: "2em", md: "5em" },
        }}
      >
        <Typography
          component="h1"
          sx={{
            zIndex: 2,
            fontWeight: 500,
            lineHeight: "127%",
            fontSize: { xs: "26px", md: "50px" },
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
          {t("mainSection.title")}{" "}
          {
            <>
              <br />
              <span
                style={{
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#d5d4d4",
                }}
              >
                {t("mainSection.subTitle")}
              </span>
            </>
          }
        </Typography>
        <Typography
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
          {t("mainSection.description")}
        </Typography>
      </Stack>
    </WrappedContainer>
  );

  return (
    <Box
      maxWidth={"1980px"}
      mt={"-114px"}
      mx={"auto"}
      position={"relative"}
      height={{ xs: "590px", md: "774px" }}
    >
      {mainImageContainer}
      {overlayImageContainer}
      <motion.div variants={animationVariants.defaultItemVariant}>
        {mainText}
      </motion.div>
    </Box>
  );
}

export default memo(TextAndMainImage);
