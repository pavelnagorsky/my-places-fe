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
  const popover = usePopover("confirm-place-delete");
  const showViewOption = status === PlaceStatusesEnum.APPROVED;

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
        <MenuItem onClick={popover.handleOpen}>
          {t("buttons.delete", { ns: "common" })}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MyPlaceMenu;
