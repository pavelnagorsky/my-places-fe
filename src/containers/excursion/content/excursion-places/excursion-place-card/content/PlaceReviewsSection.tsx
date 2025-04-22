import { alpha, Box, Button, Stack } from "@mui/material";
import { IExcursionPlaceReview } from "@/services/excursions-service/interfaces/excursion-place-review.interface";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { primaryBackground } from "@/styles/theme/lightTheme";
import useReviewDialog from "@/containers/excursion/content/excursion-places/excursion-place-card/content/logic/useReviewDialog";
import ReviewModal from "@/components/review-modal/ReviewModal";

const PlaceReviewsSection = ({
  reviews,
}: {
  reviews: IExcursionPlaceReview[];
}) => {
  const { review, handleLoadReview, onCloseReview, dialog } = useReviewDialog();

  return (
    <>
      <ReviewModal open={dialog.open} onClose={onCloseReview} review={review} />
      <Stack direction="row" gap={2} flexWrap={"wrap"}>
        {reviews.map((reviewPreview) => {
          const reviewTitle =
            reviewPreview.title.substring(0, 70).trim() +
            ((reviewPreview.title.length || 0) > 70 ? "..." : "");
          return (
            <Box key={reviewPreview.id}>
              <Button
                onClick={() => handleLoadReview(reviewPreview.id)}
                size={"small"}
                sx={{
                  borderRadius: "100px",
                  textTransform: "none",
                  textAlign: "start",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  fontWeight: 500,
                  fontSize: "16px",
                  bgcolor: alpha(primaryBackground, 0.7),
                  px: "1em",
                }}
                variant={"outlined"}
                startIcon={
                  <AssignmentIcon fontSize={"large"} color={"primary"} />
                }
              >
                {reviewTitle}
              </Button>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default PlaceReviewsSection;
