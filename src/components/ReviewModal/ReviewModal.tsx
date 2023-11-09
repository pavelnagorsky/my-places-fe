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
import { IReview } from "@/services/reviews-service/review.interface";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";
import ReviewGallery from "@/components/ReviewModal/ReviewGallery";
import StyledReviewModalContainer from "@/components/UI/ReviewContainers/StyledReviewModalContainer";

interface IReviewModalProps {
  readonly reviewId: number | null;
  readonly open: boolean;
  readonly onClose: () => void;
}

const ReviewModal = ({ open, onClose, reviewId }: IReviewModalProps) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [review, setReview] = useState<IReview | null>(null);
  function createMarkup() {
    return { __html: review?.description || "" };
  }

  useEffect(() => {
    if (!reviewId) {
      onClose();
      setTimeout(() => setReview(null), 300);
      return;
    }
    if (!open) {
      setReview(null);
      return;
    } else {
      reviewsService
        .getReviewById(reviewId, i18n.language)
        .then(({ data }) => {
          setReview(data);
        })
        .catch(() => {
          setReview(null);
          onClose();
        });
    }
  }, [open, reviewId, i18n.language]);

  const heading = review ? (
    <Stack
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

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={"lg"}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          minHeight: "518px",
          p: "1em",
          border: "2px solid #FF7A00",
          borderRadius: { md: "15px" },
        },
      }}
    >
      {review ? (
        <Grid
          mb={{ xs: "2em", md: 0 }}
          container
          spacing={{ xs: "1em", md: "2em" }}
        >
          <Grid item xs={12} md={5} lg={4}>
            <Hidden mdUp implementation="css">
              {heading}
            </Hidden>
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
            <Hidden mdUp implementation="css">
              <Divider />
            </Hidden>
            <ReviewGallery images={review.images} alt={review.title} />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Hidden mdDown implementation="css">
              {heading}
            </Hidden>
            <StyledReviewModalContainer
              sx={{
                maxHeight: { md: "500px" },
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
