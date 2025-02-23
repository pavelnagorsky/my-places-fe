import { memo } from "react";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import { Box, styled } from "@mui/material";
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
  const images = props.images.map((image, index) => {
    return (
      <MuiImage
        key={image.src}
        boxProps={{
          height: {
            xs: props.mobileHeight || defaultImageHeight,
            sm: props.laptopHeight || defaultImageHeight,
            md: props.desktopHeight || defaultImageHeight,
          },
          sx: {
            "& img": {
              objectFit: "contain",
              borderRadius: "10px",
              userSelect: "none",
            },
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
        swipeScrollTolerance={30}
        showStatus={false}
        className={"container"}
        infiniteLoop
        autoPlay
        interval={6000}
        preventMovementUntilSwipeScrollTolerance
      >
        {images}
      </Carousel>
    </StyledContainer>
  );
};

export default memo(PlaceGallery);
