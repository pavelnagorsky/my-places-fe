import { Carousel } from "react-responsive-carousel";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTranslation } from "next-i18next";

interface IReviewGalleryProps {
  images: string[];
  alt: string;
}

const StyledContainer = styled(Box)({
  "& .thumbs-wrapper": {
    "& .control-prev.control-arrow::before": {
      borderRightColor: "#959595 !important",
    },
    "& .control-next.control-arrow::before": {
      borderLeftColor: "#959595 !important",
    },
  },
  // ".carousel .control-prev.control-arrow::before": {
  //   borderRightColor: "primary.main",
  // },
  // ".carousel .control-next.control-arrow::before": {
  //   borderLeftColor: "primary.main",
  // },
  ".thumb": {
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      border: `1px solid #FF7A00 !important`,
    },
    border: "1px solid transparent !important",
    "&.selected": {
      border: `1px solid #FF7A00 !important`,
      "& img": { opacity: 1 },
    },
  },
  ".thumb img": {
    height: "100%",
    objectFit: "cover",
    // filter: "grayscale(80%)",
    opacity: 0.5,
    borderRadius: "5px",
    userSelect: "none",
  },
});

const ReviewGallery = ({ images, alt }: IReviewGalleryProps) => {
  const { t } = useTranslation("place");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledContainer>
      <Carousel
        showIndicators={false}
        showArrows
        statusFormatter={(currentItem, total) =>
          `${currentItem} ${t("reviews.from")} ${total}`
        }
        //thumbWidth={55}
        swipeable={!isMobile}
        swipeScrollTolerance={20}
        emulateTouch={!isMobile}
        renderThumbs={(children) =>
          children.map((ch, i) => (
            <Box borderRadius={"5px"} height={55} key={i}>
              {ch}
            </Box>
          ))
        }
      >
        {images.map((image, i) => (
          <Box
            component={"img"}
            borderRadius={"10px"}
            height={"320px"}
            sx={{
              objectFit: "cover",
              userSelect: "none",
            }}
            src={image}
            alt={alt}
            key={i}
          />
        ))}
      </Carousel>
    </StyledContainer>
  );
};

export default ReviewGallery;
