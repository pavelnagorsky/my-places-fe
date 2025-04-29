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
import ConfirmPopup from "@/components/confirm-popup/ConfirmPopup";

interface IMyExcursionMenuProps {
  slug: string;
  anchorEl: null | Element;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onOpenYandexNavigator: () => void;
  onOpenGoogleNavigator: () => void;
  canView: boolean;
}

const MyExcursionMenu = ({
  slug,
  anchorEl,
  handleClose,
  open,
  onDelete,
  onEdit,
  onOpenGoogleNavigator,
  onOpenYandexNavigator,
  canView,
}: IMyExcursionMenuProps) => {
  const { t } = useTranslation(["personal-area", "common"]);
  const deleteConfirmPopover = usePopover("confirm-excursion-delete");

  return (
    <Fragment>
      <Menu
        id="my-excursion-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "my-excursion-menu",
        }}
      >
        {canView && (
          <MenuItem
            component={"a"}
            href={routerLinks.excursion(slug)}
            target={"_blank"}
          >
            {t("places.menu.view")}
          </MenuItem>
        )}
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

export default MyExcursionMenu;
