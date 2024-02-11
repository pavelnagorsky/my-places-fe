import { Box, SxProps, Typography } from "@mui/material";
import { CSSProperties, memo } from "react";
import Image, { StaticImageData } from "next/image";
import Media from "@/hoc/media/Media";

interface ITextAndMainImageProps {
  title: string;
  description?: string;
  imageUrlMd: StaticImageData;
  imageUrlXs: StaticImageData;
  showMobile: boolean;
  textShadow?: boolean;
}

function TextAndMainImage(props: ITextAndMainImageProps) {
  const imageContainerSx: SxProps = {
    width: "100%",
    height: "auto",
    position: "relative",
    maxHeight: "500px",
    minHeight: "450px",
    borderRadius: { xs: 0, md: "10px" },
  };

  const imageStyle: CSSProperties = {
    objectFit: "cover",
    filter: "blur(0.5px)",
    opacity: 1,
    borderRadius: "inherit",
  };

  // main picture
  const mainImage = (
    <Media xs={"none"} sm={"block"}>
      <Box sx={imageContainerSx}>
        <Image
          sizes="(max-width: 768px) 100vw, 80vw"
          src={props.imageUrlMd}
          alt={props.title}
          fill
          priority
          style={imageStyle}
        />
      </Box>
    </Media>
  );

  // main picture mobile
  const mainImageMobile = (
    <Media xs={"block"} sm={"none"}>
      <Box sx={imageContainerSx}>
        <Image
          sizes="(max-width: 768px) 100vw, 80vw"
          src={props.imageUrlXs}
          alt={props.title}
          style={imageStyle}
          fill
          priority
        />
      </Box>
    </Media>
  );

  // text for main picture
  const mainText = (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        top: "3em",
        bottom: "3em",
        px: { xs: "1.5em", md: "3.5em" },
        // left: '10%',
        textShadow: props.textShadow
          ? "0px 4px 6px rgba(0, 0, 0, 0.25)"
          : "none",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          wordBreak: { xs: "break-word", md: "unset" },
          color: "primary.contrastText",
        }}
      >
        {props.title}
      </Typography>
      {props.description ? (
        <Typography
          component={"h2"}
          gutterBottom
          fontSize={{
            xs: "16px",
            sm: "20px",
          }}
          fontWeight={500}
          sx={{
            color: "primary.contrastText",
            width: {
              xs: "100%",
              md: "80%",
              xl: "597px",
            },
          }}
        >
          {props.description}
        </Typography>
      ) : null}
    </Box>
  );

  return (
    <Box
      position={"relative"}
      maxHeight={"500px"}
      minHeight={"400px"}
      mx={{ xs: "-1.5em", md: "0em" }}
    >
      {mainImage}
      {mainImageMobile}
      {mainText}
    </Box>
  );
}

export default memo(TextAndMainImage);
