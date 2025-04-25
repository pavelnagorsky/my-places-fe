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
import { PlaceStatusesEnum } from "@/services/places-service/enums/place-statuses.enum";
import ConfirmPopup from "@/components/confirm-popup/ConfirmPopup";

interface IMyPlaceMenuProps {
  anchorEl: null | Element;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAddReview: () => void;
  placeSlug: string;
  status: PlaceStatusesEnum;
}

const MyPlaceMenu = ({
  anchorEl,
  handleClose,
  open,
  onDelete,
  placeSlug,
  onAddReview,
  onEdit,
  status,
}: IMyPlaceMenuProps) => {
  const { t } = useTranslation(["personal-area", "common"]);
  const deleteConfirmPopover = usePopover("confirm-place-delete");
  const showViewOption = status === PlaceStatusesEnum.APPROVED;

  return (
    <Fragment>
      <Menu
        id="my-place-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "my-place-menu",
        }}
      >
        {showViewOption && (
          <MenuItem
            onClick={handleClose}
            component={"a"}
            href={routerLinks.place(placeSlug)}
            target={"_blank"}
          >
            {t("places.menu.view")}
          </MenuItem>
        )}
        <MenuItem onClick={onAddReview}>{t("places.menu.addReview")}</MenuItem>
        <MenuItem onClick={onEdit}>{t("places.menu.edit")}</MenuItem>
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

export default MyPlaceMenu;
