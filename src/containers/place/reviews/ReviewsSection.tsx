import { Badge, IconButton, Stack, Typography } from "@mui/material";
import ReviewCard from "@/containers/place/reviews/ReviewCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfiniteScroll from "react-infinite-scroll-component";
import useReviews from "@/containers/place/reviews/useReviews";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { routerLinks } from "@/routing/routerLinks";
import NoReviews from "@/containers/place/reviews/NoReviews";
import useDialog from "@/hooks/useDialog";
import ReviewModal from "@/components/review-modal/ReviewModal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";
import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchReview } from "@/services/reviews-service/interfaces/interfaces";

interface IReviewsSectionProps {
  reviews: IPaginationResponse<ISearchReview>;
  placeSlug: string;
  placeId: number;
}

const ReviewsSection = ({
  reviews,
  placeSlug,
  placeId,
}: IReviewsSectionProps) => {
  const { t, i18n } = useTranslation(["place", "common"]);
  const data = useReviews({ defaultData: reviews, placeSlug: placeSlug });
  const newReviewLink = routerLinks.createReview + `?placeId=${placeId}`;
  const [review, setReview] = useState<IReview | null>(null);
  const dialog = useDialog();
  const router = useRouter();

  const handleLoadReview = (reviewId: number) => {
    dialog.handleOpen();
    reviewsService
      .getReviewById(reviewId, i18n.language)
      .then(({ data }) => {
        setReview(data);
      })
      .catch(() => {
        setReview(null);
        dialog.handleClose();
      });
  };

  useEffect(() => {
    const routerReviewId = router.query.review;
    if (routerReviewId && !Number.isNaN(+routerReviewId) && !dialog.open) {
      handleLoadReview(+routerReviewId);
    }
  }, [router.query]);

  const onClickOpenReview = (reviewId: number) => {
    router.push(router.asPath + `?review=${reviewId}`, undefined, {
      shallow: true,
    });
    handleLoadReview(reviewId);
  };

  const onCloseReview = () => {
    router.push(`/places/${router.query.slug}`, undefined, { shallow: true });
    dialog.handleClose();
    setReview(null);
  };

  return (
    <Stack mb={{ xs: "2em", lg: 0 }}>
      <Stack
        mx={{ lg: "1em" }}
        direction={"row"}
        mb={"0.5em"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          pb={0}
          variant={"h2"}
          component={"h2"}
          fontSize={{ xs: "24px", md: "30px" }}
        >
          {t("reviews.placeReviews")}
        </Typography>
        <IconButton component={Link} href={newReviewLink}>
          <Badge badgeContent={reviews.totalItems} color="primary">
            <AddCircleOutlineIcon fontSize={"large"} />
          </Badge>
        </IconButton>
      </Stack>
      <ReviewModal open={dialog.open} onClose={onCloseReview} review={review} />
      <Stack
        id="scrollableDiv"
        maxHeight={{ xs: "765px", md: "1530px" }}
        sx={{
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
      >
        {reviews.totalItems === 0 && (
          <Stack p={"1em"}>
            <NoReviews link={newReviewLink} />
          </Stack>
        )}
        <InfiniteScroll
          dataLength={data.reviews.length}
          next={data.handleSearch}
          hasMore={data.hasMore}
          loader={
            <Typography textAlign={"center"} variant={"body2"} fontWeight={600}>
              {t("loading", { ns: "common" })}
            </Typography>
          }
          style={{
            gap: "2em",
            display: "flex",
            flexDirection: "column",
            padding: "1em",
          }}
          // scrollableTarget="scrollableDiv"
        >
          <AnimatePresence mode="popLayout">
            {data.reviews.map((r, i) => {
              // each card will be delayed based on it's index
              // but, we need to subtract the delay from all the previously loaded cards
              const recalculatedDelay =
                i >= reviews.totalItems * 2
                  ? (i - reviews.totalItems * (data.reviews.length - 1)) / 15
                  : i / 15;
              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0.5, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.25, 0, 1],
                    delay: recalculatedDelay,
                  }}
                >
                  <ReviewCard onClick={onClickOpenReview} review={r} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </InfiniteScroll>
      </Stack>
    </Stack>
  );
};

export default ReviewsSection;
