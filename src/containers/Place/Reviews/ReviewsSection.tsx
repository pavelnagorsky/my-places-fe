import {
  Badge,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ReviewCard from "@/containers/Place/Reviews/ReviewCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ISearchReviewsResponse } from "@/services/reviews-service/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import useReviews from "@/containers/Place/Reviews/useReviews";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/UI/Button/Button";
import { routerLinks } from "@/staticData/routerLinks";
import NoReviews from "@/containers/Place/Reviews/NoReviews";

interface IReviewsSectionProps {
  reviews: ISearchReviewsResponse;
  placeId: number;
}

const ReviewsSection = ({ reviews, placeId }: IReviewsSectionProps) => {
  const data = useReviews({ defaultData: reviews, placeId: placeId });
  const newReviewLink = routerLinks.createReview + `?placeId=${placeId}`;

  return (
    <Stack mb={{ xs: "2em", md: 0 }}>
      <Stack
        mx={{ md: "1em" }}
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
          Заметки к месту
        </Typography>
        <IconButton component={Link} href={newReviewLink}>
          <Badge badgeContent={reviews.totalResults} color="primary">
            <AddCircleOutlineIcon fontSize={"large"} />
          </Badge>
        </IconButton>
      </Stack>
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
        {reviews.totalResults === 0 && (
          <Stack p={"1em"}>
            <NoReviews link={newReviewLink} />
          </Stack>
        )}
        <InfiniteScroll
          dataLength={data.reviews.length}
          next={data.handleSearch}
          hasMore={data.hasMore}
          loader={
            <Typography textAlign={"center"} variant={"body2"} fontWeight={700}>
              Loading...
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
              // but we need to subtract the delay from all the previously loaded cards
              const recalculatedDelay =
                i >= reviews.totalResults * 2
                  ? (i - reviews.totalResults * (data.reviews.length - 1)) / 15
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
                  <ReviewCard review={r} />
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
