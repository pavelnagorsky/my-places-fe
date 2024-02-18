import { memo } from "react";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import { alpha, Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

interface IGalleryProps {
  images: { src: string; alt: string }[];
  mobileHeight?: number;
  desktopHeight?: number;
  laptopHeight?: number;
}

const defaultImageHeight = 500;

const StyledContainer = styled(Box)({
  "& .carousel-slider": {
    borderRadius: "10px",
    "& .dot": {
      height: "10px !important",
      width: "10px !important",
      opacity: "1 !important",
      backgroundColor: "rgba(255, 122, 0, 0.4) !important",
      "&.selected": {
        backgroundColor: "rgb(255, 122, 0) !important",
      },
    },
  },
  "& .thumbs-wrapper": {
    margin: "0 !important",
  },
});

const PlaceGallery = (props: IGalleryProps) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isLaptop = useMediaQuery(theme.breakpoints.down("md"));
  const images = props.images.map((image, index) => {
    return (
      <MuiImage
        key={image.src}
        boxProps={{
          //width: "100%",
          //height: "100%",
          height: {
            xs: props.mobileHeight || defaultImageHeight,
            sm: props.laptopHeight || defaultImageHeight,
            md: props.desktopHeight || defaultImageHeight,
          },
          sx: {
            "& img": { objectFit: "cover", borderRadius: "10px" },
          },
        }}
        imageProps={{
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
    <StyledContainer>
      <Carousel
        showIndicators
        showArrows
        //showThumbs={false}
        renderThumbs={() => []}
        swipeable
        emulateTouch
        showStatus={false}
        className={"container"}
        infiniteLoop
        autoPlay
        interval={6000}
      >
        {images}
      </Carousel>
    </StyledContainer>
  );

  // return (
  //   <Box
  //   >
  //     <Carousel
  //       autoPlay
  //       interval={6000}
  //       indicators
  //       // swipe
  //       fullHeightHover
  //       stopAutoPlayOnHover
  //       className={"container"}
  //       animation="slide"
  //       // height={
  //       //   isMobile && props.mobileHeight
  //       //     ? props.mobileHeight
  //       //     : isLaptop && props.laptopHeight
  //       //     ? props.laptopHeight
  //       //     : props.desktopHeight || 500
  //       // }
  //       indicatorContainerProps={{
  //         className: "indicators",
  //       }}
  //       activeIndicatorIconButtonProps={{
  //         style: {
  //           color: theme.palette.primary.main,
  //         },
  //       }}
  //       indicatorIconButtonProps={{
  //         style: {
  //           color: alpha(theme.palette.primary.main, 0.2),
  //         },
  //       }}
  //       {...props}
  //       sx={{
  //         "& img": {
  //           borderRadius: "10px",
  //           // height: {
  //           //   xs: props.mobileHeight || defaultImageHeight,
  //           //   sm: props.laptopHeight || defaultImageHeight,
  //           //   md: props.desktopHeight || defaultImageHeight,
  //           // },
  //         },
  //         "& svg": {
  //           height: "1.3em",
  //           width: "1.3em",
  //         },
  //         ...props.sx,
  //       }}
  //     >
  //       {images}
  //     </Carousel>
  //   </Box>
  // );
};

export default memo(PlaceGallery);
