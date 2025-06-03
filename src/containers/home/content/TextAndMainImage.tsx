import { Box, Stack, SxProps, Typography } from "@mui/material";
import { CSSProperties, memo } from "react";
import Image, { StaticImageData } from "next/image";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";

interface ITextAndMainImageProps {
  title: string;
  subTitle?: string;
  description?: string;
  image: StaticImageData;
  overlayImage?: StaticImageData;
  textShadow?: boolean;
}

function TextAndMainImage(props: ITextAndMainImageProps) {
  const imageContainerSx: SxProps = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  const imageStyle: CSSProperties = {
    objectFit: "cover",
  };

  // main picture
  const mainImage = (
    <Box sx={imageContainerSx}>
      <Image
        sizes="(max-width: 1980px) 100vw, 1980px"
        src={props.image}
        alt={props.title}
        fill
        priority
        style={imageStyle}
      />
    </Box>
  );

  // overlay picture
  const overlayImage = !!props.overlayImage && (
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
        src={props.overlayImage}
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
          textShadow: props.textShadow
            ? "0px 4px 6px rgba(0, 0, 0, 0.25)"
            : "none",
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
          {props.title}{" "}
          {!!props.subTitle && (
            <>
              <br />
              <span
                style={{
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#d5d4d4",
                }}
              >
                {props.subTitle}
              </span>
            </>
          )}
        </Typography>
        {props.description ? (
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
            {props.description}
          </Typography>
        ) : null}
      </Stack>
    </WrappedContainer>
  );

  return (
    <Box
      maxWidth={"1980px"}
      mx={"auto"}
      position={"relative"}
      height={{ xs: "590px", md: "774px" }}
    >
      {mainImage}
      {overlayImage}
      {mainText}
    </Box>
  );
}

export default memo(TextAndMainImage);
