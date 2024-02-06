import {
  Box,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { IModerationReview } from "@/services/reviews-service/interfaces/moderation-review.interface";
import { routerLinks } from "@/routing/routerLinks";

interface IReviewItemProps {
  review: IModerationReview;
}

const ReviewItem = ({ review }: IReviewItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const dateFnsLocale = useDateFnsLocale();

  const reviewTitleBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{review.title}</Typography>
    </Stack>
  );

  const placeTitleBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{review.placeTitle}</Typography>
      <Typography
        variant={"body1"}
        component={Link}
        color={"secondary.main"}
        sx={{ textDecoration: "underline #565656" }}
        href={routerLinks.place(review.placeSlug)}
        target={"_blank"}
      >
        {review.placeSlug}
      </Typography>
    </Stack>
  );

  const createdAtInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(review.createdAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const updatedAtInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(review.updatedAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const authorInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{review.authorName}</Typography>
      <Typography variant={"body2"} sx={{ wordBreak: "break-word" }}>
        {review.authorEmail}
      </Typography>
    </Stack>
  );

  const mobileView = (
    <Box
      sx={{
        cursor: "pointer",
        mb: "2em",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        p: "1.5em",
        borderRadius: "20px",
        "& label": {
          mb: "0.3em",
        },
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Stack direction={"row"}>
        <Grid container spacing={"1em"}>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Название</CustomLabel>
            {reviewTitleBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Место</CustomLabel>
            {placeTitleBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Автор</CustomLabel>
            {authorInfoBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Дата создания</CustomLabel>
            {createdAtInfoBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Дата обновления</CustomLabel>
            {updatedAtInfoBox}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );

  const desktopView = (
    <Box
      py={"1em"}
      px={"0em"}
      sx={{
        cursor: "pointer",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        my: "1em",
        borderRadius: "20px",
        paddingInlineStart: "1em",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Grid container spacing={"1em"} alignItems={"center"}>
        <Grid item xs={2.5}>
          {reviewTitleBox}
        </Grid>
        <Grid item xs={3}>
          {placeTitleBox}
        </Grid>
        <Grid item xs={2.5}>
          {authorInfoBox}
        </Grid>
        <Grid item xs={2}>
          {createdAtInfoBox}
        </Grid>
        <Grid item xs={2}>
          {updatedAtInfoBox}
        </Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default ReviewItem;
