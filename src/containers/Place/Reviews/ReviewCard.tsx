import { IReview } from "@/services/reviews-service/review.interface";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import StyledReviewsContainer from "../../../components/UI/ReviewContainers/StyledReviewsContainer";

interface IReviewCardProps {
  review: IReview;
  onClick: (reviewId: number) => void;
}

const ReviewCard = ({ review, onClick }: IReviewCardProps) => {
  function createMarkup() {
    return { __html: review.description };
  }
  return (
    <Card
      sx={{
        height: "350px",
        borderRadius: "10px",
        boxShadow: "2px 2px 15px 2px rgba(0, 0, 0, 0.20)",
        border: "0.5px solid #FF7900",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          zIndex: 1,
          position: "absolute",
          bottom: "0",
          height: "50%",
          display: "flex",
          alignItems: "end",
          background:
            "linear-gradient(180deg, rgba(254, 254, 254, 0.00) 20.56%, rgba(255, 255, 255, 0.89) 60.96%, #FFF 89.44%, #FFF 89.44%)",
        }}
      >
        <Button
          onClick={() => onClick(review.id)}
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            py: "1em",
            borderRadius: "10px",
          }}
          fullWidth
          variant={"text"}
        >
          Открыть
        </Button>
      </Box>
      <Box px={"1em"} mt={"1em"}>
        <Stack
          mb={"0.8em"}
          direction={"row"}
          gap={"0.5em"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant={"body2"}
            fontWeight={500}
            fontSize={{ xs: "16px" }}
          >
            {review.authorUsername}
          </Typography>
          <Typography
            variant={"body2"}
            fontWeight={500}
            fontSize={{ xs: "14px" }}
          >
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Typography>
        </Stack>
        <Typography
          mb={"0.5em"}
          component={"h3"}
          fontWeight={500}
          fontSize={{ xs: "22px", md: "24px" }}
        >
          {review.title}
        </Typography>
      </Box>
      <Box height={"100%"}>
        <StyledReviewsContainer
          px={"1em"}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Box>
    </Card>
  );
};

export default ReviewCard;
