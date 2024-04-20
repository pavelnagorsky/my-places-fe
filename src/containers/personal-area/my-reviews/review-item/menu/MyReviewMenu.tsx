import { useTranslation } from "next-i18next";
import usePopover from "@/hooks/usePopover";
import { Fragment } from "react";
import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { routerLinks } from "@/routing/routerLinks";
import { ReviewStatusesEnum } from "@/services/reviews-service/interfaces/review-statuses.enum";

interface IMyReviewMenuProps {
  anchorEl: null | Element;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  placeSlug: string;
  reviewId: number;
  status: ReviewStatusesEnum;
}

const MyReviewMenu = ({
  anchorEl,
  handleClose,
  open,
  onDelete,
  placeSlug,
  onEdit,
  reviewId,
  status,
}: IMyReviewMenuProps) => {
  const { t } = useTranslation(["personal-area", "common"]);
  const popover = usePopover("confirm-review-delete");
  const showViewOption = status === ReviewStatusesEnum.APPROVED;

  return (
    <Fragment>
      <Popover
        open={popover.open}
        id={popover.id}
        anchorEl={popover.anchor}
        onClose={popover.handleClose}
        PaperProps={{
          sx: {
            p: "1em",
            borderRadius: "15px",
          },
        }}
      >
        <Typography fontSize={"16px"} fontWeight={500}>
          {t("confirmText")}
        </Typography>
        <Divider sx={{ borderColor: "divider", my: "0.5em" }} />
        <Stack direction={"row"} justifyContent={"center"} mt={1}>
          <Button
            variant={"contained"}
            color={"error"}
            sx={{ textTransform: "none", fontSize: 16 }}
            onClick={() => {
              popover.handleClose();
              onDelete();
            }}
          >
            {t("buttons.delete", { ns: "common" })}
          </Button>
        </Stack>
      </Popover>
      <Menu
        id="my-review-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "my-review-menu",
        }}
      >
        {showViewOption && (
          <MenuItem
            onClick={handleClose}
            component={"a"}
            href={routerLinks.review(placeSlug, reviewId)}
            target={"_blank"}
          >
            {t("reviews.menu.view")}
          </MenuItem>
        )}
        <MenuItem onClick={onEdit}>{t("reviews.menu.edit")}</MenuItem>
        <MenuItem onClick={popover.handleOpen}>
          {t("buttons.delete", { ns: "common" })}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MyReviewMenu;
