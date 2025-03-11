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

interface IMyExcursionMenuProps {
  anchorEl: null | Element;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onOpenYandexNavigator: () => void;
  onOpenGoogleNavigator: () => void;
}

const MyExcursionMenu = ({
  anchorEl,
  handleClose,
  open,
  onDelete,
  onEdit,
  onOpenGoogleNavigator,
  onOpenYandexNavigator,
}: IMyExcursionMenuProps) => {
  const { t } = useTranslation(["personal-area", "common"]);
  const popover = usePopover("confirm-excursion-delete");

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
        id="my-excursion-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "my-excursion-menu",
        }}
      >
        <MenuItem onClick={onEdit}>{t("routes.menu.edit")}</MenuItem>
        <MenuItem onClick={popover.handleOpen}>
          {t("buttons.delete", { ns: "common" })}
        </MenuItem>
        <MenuItem onClick={onOpenGoogleNavigator}>
          {t("routes.menu.google")}
        </MenuItem>
        <MenuItem onClick={onOpenYandexNavigator}>
          {t("routes.menu.yandex")}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MyExcursionMenu;
