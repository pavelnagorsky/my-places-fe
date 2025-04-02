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
        {reviews.map((review) => (
          <Box key={review.id}>
            <Button
              onClick={() => handleLoadReview(review.id)}
              size={"small"}
              sx={{
                borderRadius: "100px",
                textTransform: "none",
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
              {review.title}
            </Button>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default PlaceReviewsSection;
