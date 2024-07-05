import {
  Box,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IMyReview } from "../../../../../../../services/reviews-service/interfaces/my-review.interface";
import { ReviewStatusesEnum } from "../../../../../../../services/reviews-service/interfaces/review-statuses.enum";
import useReviewStatuses from "@/hooks/useReviewStatuses";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { format } from "date-fns";
import MyReviewMenu from "@/containers/personal-area/my-reviews/review-item/menu/MyReviewMenu";
import usePlaceReviewMenu from "@/containers/admin/places/place/tabs/reviews/table/menu/usePlaceReviewMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IPlaceReviewsTableItemProps {
  item: IMyReview;
  onDelete: (reviewId: number) => void;
}

const PlaceReviewsTableItem = ({
  item,
  onDelete,
}: IPlaceReviewsTableItemProps) => {
  const reviewStatuses = useReviewStatuses();
  const dateFnsLocale = useDateFnsLocale();
  const showStatusTooltip = item.status === ReviewStatusesEnum.REJECTED;

  const menu = usePlaceReviewMenu({ reviewId: item.id, onDelete });

  const parseStatusColor = (status: ReviewStatusesEnum) => {
    if (status === ReviewStatusesEnum.MODERATION) return "warning.main";
    if (status === ReviewStatusesEnum.APPROVED) return "success.main";
    if (status === ReviewStatusesEnum.REJECTED) return "error.main";
    return "";
  };

  return (
    <TableRow tabIndex={-1}>
      <TableCell component="th" scope="row" align="center">
        {item.id}
      </TableCell>

      <TableCell component="th" scope="row">
        <Typography variant={"body1"}>{item.title}</Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={3000}
          title={
            item.moderationMessage ? (
              <Typography p={"0.5em"} fontSize={"14px"}>
                {item.moderationMessage}
              </Typography>
            ) : null
          }
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"0.5em"}
            sx={{
              cursor: item.moderationMessage ? "pointer" : undefined,
            }}
          >
            <Box
              borderRadius={"50%"}
              height={"10px"}
              width={"10px"}
              bgcolor={parseStatusColor(item.status)}
            />
            <Typography variant={"body1"}>
              {reviewStatuses.find((s) => s.id === item.status)?.label}
            </Typography>
            {showStatusTooltip && (
              <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
            )}
          </Stack>
        </Tooltip>
      </TableCell>

      <TableCell component="th" scope="row">
        <Typography variant={"body1"}>{item.viewsCount}</Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <Typography variant={"body1"}>
          {format(new Date(item.createdAt), "dd MMM yyyy", {
            locale: dateFnsLocale,
          })}
        </Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <Typography variant={"body1"}>{item.author || "-"}</Typography>
      </TableCell>

      <TableCell component="th" scope="row">
        <IconButton
          onClick={menu.popover.handleOpen}
          color={"secondary"}
          size={"small"}
        >
          <MoreVertIcon />
        </IconButton>
        <MyReviewMenu
          anchorEl={menu.popover.anchor}
          open={menu.popover.open}
          handleClose={menu.popover.handleClose}
          onDelete={menu.handleDelete}
          onEdit={menu.handleEdit}
          placeSlug={item.placeSlug}
          reviewId={item.id}
          status={item.status}
        />
      </TableCell>
    </TableRow>
  );
};

export default PlaceReviewsTableItem;
