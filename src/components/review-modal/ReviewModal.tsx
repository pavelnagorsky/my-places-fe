import {
  Box,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";
import ReviewGallery from "@/components/review-modal/ReviewGallery";
import StyledReviewModalContainer from "@/components/UI/review-containers/StyledReviewModalContainer";
import { Fragment } from "react";

interface IReviewModalProps {
  readonly review: IReview | null;
  readonly open: boolean;
  readonly onClose: () => void;
}

const ReviewModal = ({ open, onClose, review }: IReviewModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  function createMarkup() {
    return { __html: review?.description || "" };
  }

  const hasPhotos = (review?.images?.length as number) > 0;

  const heading = review ? (
    <Stack
      position={{ xs: "sticky", md: "relative" }}
      top={{ xs: 0, md: "unset" }}
      zIndex={10}
      pt={{ xs: "1em", md: 0 }}
      bgcolor={"white"}
      direction={"row"}
      gap={"1em"}
      justifyContent={"space-between"}
      alignItems={"baseline"}
    >
      <Typography
        variant={"h3"}
        fontSize={{ xs: "25px", md: "35px" }}
        component={"h1"}
      >
        {review.title}
      </Typography>
      <IconButton onClick={onClose}>
        <ClearIcon />
      </IconButton>
    </Stack>
  ) : null;

  const gallerySection = review ? (
    <Grid item xs={12} md={hasPhotos ? 5 : 12} lg={hasPhotos ? 4 : 12}>
      <Stack
        mb={"1em"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          variant={"body2"}
          fontWeight={500}
          fontSize={{ xs: "14px", md: "18px" }}
        >
          {review.authorUsername}
        </Typography>
        <Typography
          variant={"body2"}
          fontWeight={500}
          fontSize={{ xs: "14px", md: "18px" }}
        >
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Typography>
      </Stack>
      {hasPhotos && (
        <Fragment>
          <Hidden mdUp>
            <Divider />
          </Hidden>
          <ReviewGallery images={review.images} alt={review.title} />
        </Fragment>
      )}
    </Grid>
  ) : null;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={hasPhotos ? "lg" : "md"}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          pt: { xs: 0, md: "1em" },
          minHeight: "518px",
          p: "1em",
          border: "2px solid #FF7A00",
          borderRadius: { md: "15px" },
        },
      }}
    >
      <Hidden mdUp>{heading}</Hidden>
      {review ? (
        <Grid
          mb={{ xs: "2em", md: 0 }}
          container
          spacing={hasPhotos ? { xs: "1em", md: "2em" } : undefined}
        >
          {hasPhotos && gallerySection}
          <Grid item xs={12} md={hasPhotos ? 7 : 12} lg={hasPhotos ? 8 : 12}>
            <Hidden mdDown implementation="css">
              {heading}
            </Hidden>
            {!hasPhotos && gallerySection}
            <StyledReviewModalContainer
              sx={{
                maxHeight: { md: "630px" },
                p: 0,
                paddingInlineEnd: { md: "1em" },
                height: "auto",
                overflowY: "auto",
                scrollbarWidth: "thin !important",
                scrollbarColor: "#aeaeaeb8 rgba(0, 0, 0, 0.05)",
                "&::-webkit-scrollbar-track": {
                  background: "rgba(0, 0, 0, 0.1);",
                },
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                /* Handle */
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                },

                /* Handle on hover */
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
              px={"1em"}
              dangerouslySetInnerHTML={createMarkup()}
            />
          </Grid>
        </Grid>
      ) : (
        <Box height={"518px"} position={"relative"}>
          <CircularProgress
            size={50}
            sx={{
              position: "absolute",
              top: "calc(50% - 20px)",
              left: "calc(50% - 20px)",
            }}
          />
        </Box>
      )}
    </Dialog>
  );
};

export default ReviewModal;
