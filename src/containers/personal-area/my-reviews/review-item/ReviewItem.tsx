import {
  Box,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { routerLinks } from "@/routing/routerLinks";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IMyReview } from "@/services/reviews-service/interfaces/my-review.interface";
import useMyReviewMenu from "@/containers/personal-area/my-reviews/review-item/menu/useMyReviewMenu";
import useReviewStatuses from "@/hooks/useReviewStatuses";
import { ReviewStatusesEnum } from "@/services/reviews-service/interfaces/review-statuses.enum";
import MyReviewMenu from "@/containers/personal-area/my-reviews/review-item/menu/MyReviewMenu";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";

interface IReviewItemProps {
  review: IMyReview;
  onDelete: (placeId: number) => void;
}

const ReviewItem = ({ review, onDelete }: IReviewItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const reviewStatuses = useReviewStatuses();
  const dateFnsLocale = useDateFnsLocale();
  const menu = useMyReviewMenu({ reviewId: review.id, onDelete });

  const showStatusTooltip = review.status === ReviewStatusesEnum.REJECTED;

  const parseStatusColor = (status: ReviewStatusesEnum) => {
    if (status === ReviewStatusesEnum.MODERATION) return "warning.main";
    if (status === ReviewStatusesEnum.APPROVED) return "success.main";
    if (status === ReviewStatusesEnum.REJECTED) return "error.main";
    return "";
  };

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

  const statusInfoBox = (
    <Tooltip
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={9000}
      title={
        review.moderationMessage ? (
          <Typography p={"0.5em"} fontSize={"14px"}>
            {review.moderationMessage}
          </Typography>
        ) : null
      }
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"0.5em"}
        sx={{ cursor: review.moderationMessage ? "pointer" : undefined }}
      >
        <Box
          borderRadius={"50%"}
          height={"10px"}
          width={"10px"}
          bgcolor={parseStatusColor(review.status)}
        />
        <Typography variant={"body1"}>
          {reviewStatuses.find((s) => s.id === review.status)?.label}
        </Typography>
        {showStatusTooltip && (
          <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
        )}
      </Stack>
    </Tooltip>
  );

  const viewsBox = (
    <Box>
      <Typography variant={"body1"}>{review.viewsCount}</Typography>
    </Box>
  );

  const dateInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(review.createdAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const mobileView = (
    <Box
      sx={{
        mb: "2em",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        p: "1.5em",
        borderRadius: "20px",
        "& label": {
          mb: "0.3em",
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
            <CustomLabel>Статус</CustomLabel>
            {statusInfoBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Просмотры</CustomLabel>
            {viewsBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Дата создания</CustomLabel>
            {dateInfoBox}
          </Grid>
        </Grid>
        <Stack ml={"0.5em"} justifyContent={"space-between"}>
          <IconButton
            onClick={menu.handleClick}
            color={"secondary"}
            size={"small"}
          >
            <MoreVertIcon />
          </IconButton>
          <MyReviewMenu
            anchorEl={menu.anchorEl}
            open={menu.open}
            handleClose={menu.handleClose}
            onDelete={menu.handleDelete}
            onEdit={menu.handleEdit}
            placeSlug={review.placeSlug}
            reviewId={review.id}
          />
        </Stack>
      </Stack>
    </Box>
  );

  const desktopView = (
    <Box
      py={"1em"}
      px={"0em"}
      sx={{
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        my: "1em",
        borderRadius: "20px",
      }}
    >
      <Grid container pl={"1em"} spacing={"1em"} alignItems={"center"}>
        <Grid item xs={2.5}>
          {reviewTitleBox}
        </Grid>
        <Grid item xs={2.5}>
          {placeTitleBox}
        </Grid>
        <Grid item xs={2.5}>
          {statusInfoBox}
        </Grid>
        <Grid item xs={1.5}>
          {viewsBox}
        </Grid>
        <Grid item xs={2}>
          {dateInfoBox}
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color={"secondary"}
            //sx={{ mr: "0.5em" }}
            onClick={menu.handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <MyReviewMenu
            anchorEl={menu.anchorEl}
            open={menu.open}
            handleClose={menu.handleClose}
            onDelete={menu.handleDelete}
            onEdit={menu.handleEdit}
            placeSlug={review.placeSlug}
            reviewId={review.id}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default ReviewItem;
