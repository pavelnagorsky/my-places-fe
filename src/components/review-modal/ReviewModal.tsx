import {
  Box,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
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
    <>
      <Stack position={{ md: "sticky" }} top={0} zIndex={10} bgcolor={"white"}>
        <Stack
          pb={"0.5em"}
          direction={"row"}
          gap={"1em"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Typography
            variant={"h3"}
            fontSize={{ xs: "25px", md: "30px" }}
            component={"h1"}
            pb={0}
          >
            {review.title}
          </Typography>
          <div />
          <IconButton
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={onClose}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Box
        position={"fixed"}
        zIndex={11}
        bgcolor={"white"}
        borderRadius={"50%"}
        top={"1em"}
        right={"1em"}
        display={{ md: "none" }}
      >
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </Box>
    </>
  ) : null;

  const gallerySection = review ? (
    <Grid size={{ xs: 12, md: hasPhotos ? 5 : 12, lg: hasPhotos ? 4 : 12 }}>
      <Stack position={"sticky"} top={0}>
        <Stack
          mb={{ md: "1em" }}
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
            {isMobile && <Divider />}
            <ReviewGallery images={review.images} alt={review.title} />
          </Fragment>
        )}
      </Stack>
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
          p: "1em",
          scrollbarWidth: "thin",
          paddingInlineEnd: { md: 0 },
          minHeight: "518px",
          border: isMobile ? 0 : `2px solid #FF7A00`,
          borderRadius: { md: "15px" },
        },
      }}
    >
      {isMobile && heading}
      {review ? (
        <Grid
          height={"100%"}
          position={"relative"}
          maxHeight={{ md: "calc(100% - 64px)" }}
          sx={{
            scrollbarWidth: "thin",
            overflowY: { md: "auto" },
          }}
          container
          spacing={hasPhotos ? { xs: "1em", md: "2em" } : undefined}
        >
          {hasPhotos && gallerySection}
          <Grid
            size={{ xs: 12, md: hasPhotos ? 7 : 12, lg: hasPhotos ? 8 : 12 }}
          >
            {!isMobile && heading}
            {!hasPhotos && gallerySection}
            <StyledReviewModalContainer
              sx={{
                p: 0,
                mb: "1em",
                paddingInlineEnd: { md: "1em" },
              }}
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
