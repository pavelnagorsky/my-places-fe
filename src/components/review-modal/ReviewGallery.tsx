import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IReviewGalleryProps {
  images: string[];
  alt: string;
}

const ReviewGallery = ({ images, alt }: IReviewGalleryProps) => {
  return (
    <Box
      sx={{
        ".thumbs-wrapper": {
          mx: "13px !important",
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
          border: "none !important",
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
        },
      }}
    >
      <Carousel
        showIndicators={false}
        showArrows
        showThumbs
        statusFormatter={(currentItem, total) => `${currentItem} из ${total}`}
        renderThumbs={(children) =>
          children.map((ch, i) => (
            <Box borderRadius={"5px"} height={72} width={72} key={i}>
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
            sx={{ objectFit: "cover" }}
            src={image}
            alt={alt}
            key={i}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default ReviewGallery;
