import Carousel from "react-material-ui-carousel";
import { CarouselProps } from "react-material-ui-carousel/dist/components/types";
import { memo } from "react";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import { alpha, Box, useMediaQuery, useTheme } from "@mui/material";

interface IGalleryProps extends Omit<CarouselProps, "height"> {
  images: { src: string; alt: string }[];
  mobileHeight?: number;
  desktopHeight?: number;
  laptopHeight?: number;
}

const Gallery = (props: IGalleryProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("md"));
  const images = props.images.map((image, index) => {
    return (
      <MuiImage
        key={image.src}
        boxProps={{
          //width: "100%",
          height: "100%",
        }}
        imageProps={{
          style: {
            objectFit: "cover",
          },
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 70vw",
          fill: true,
          priority: index < 1,
          alt: image.alt,
          src: image.src,
        }}
      />
    );
  });

  return (
    <Box>
      <Carousel
        autoPlay
        interval={6000}
        indicators
        swipe
        fullHeightHover
        stopAutoPlayOnHover
        className={"container"}
        animation="slide"
        height={
          isMobile && props.mobileHeight
            ? props.mobileHeight
            : isLaptop && props.laptopHeight
            ? props.laptopHeight
            : props.desktopHeight || 500
        }
        indicatorContainerProps={{
          className: "indicators",
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: theme.palette.primary.main,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            color: alpha(theme.palette.primary.main, 0.2),
          },
        }}
        {...props}
        sx={{
          "& img": { borderRadius: "10px" },
          "& svg": {
            height: "1.3em",
            width: "1.3em",
          },
          ...props.sx,
        }}
      >
        {images}
      </Carousel>
    </Box>
  );
};

export default memo(Gallery);
