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
import { ReviewStatusesEnum } from "@/services/reviews-service/enums/review-statuses.enum";
import ConfirmPopup from "@/components/confirm-popup/ConfirmPopup";

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
  const deleteConfirmPopover = usePopover("confirm-review-delete");
  const showViewOption = status === ReviewStatusesEnum.APPROVED;

  return (
    <Fragment>
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
        <MenuItem onClick={deleteConfirmPopover.handleOpen}>
          {t("buttons.delete", { ns: "common" })}
        </MenuItem>
      </Menu>
      <ConfirmPopup
        popoverProps={deleteConfirmPopover}
        actionText={t("buttons.delete", { ns: "common" })}
        title={t("confirmText")}
        onSubmit={onDelete}
      />
    </Fragment>
  );
};

export default MyReviewMenu;
