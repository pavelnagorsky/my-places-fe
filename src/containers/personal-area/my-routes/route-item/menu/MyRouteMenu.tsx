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
import ConfirmPopup from "@/components/confirm-popup/ConfirmPopup";

interface IMyRouteMenuProps {
  anchorEl: null | Element;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onOpenYandexNavigator: () => void;
  onOpenGoogleNavigator: () => void;
  onCopyLink: () => void;
}

const MyRouteMenu = ({
  anchorEl,
  handleClose,
  open,
  onDelete,
  onEdit,
  onOpenGoogleNavigator,
  onOpenYandexNavigator,
  onCopyLink,
}: IMyRouteMenuProps) => {
  const { t } = useTranslation(["personal-area", "common"]);
  const deleteConfirmPopover = usePopover("confirm-route-delete");

  return (
    <Fragment>
      <Menu
        id="my-route-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "my-route-menu",
        }}
      >
        <MenuItem onClick={onCopyLink}>{t("routes.menu.copyLink")}</MenuItem>
        <MenuItem onClick={onEdit}>{t("routes.menu.edit")}</MenuItem>
        <MenuItem onClick={deleteConfirmPopover.handleOpen}>
          {t("buttons.delete", { ns: "common" })}
        </MenuItem>
        <MenuItem onClick={onOpenGoogleNavigator}>
          {t("routes.menu.google")}
        </MenuItem>
        <MenuItem onClick={onOpenYandexNavigator}>
          {t("routes.menu.yandex")}
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

export default MyRouteMenu;
