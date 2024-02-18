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
import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";

interface IMyPlaceMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  placeSlug: string;
  status: PlaceStatusesEnum;
}

const MyPlaceMenu = ({
  anchorEl,
  handleClose,
  open,
  onDelete,
  placeSlug,
  onEdit,
  status,
}: IMyPlaceMenuProps) => {
  const { t } = useTranslation();
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
          Вы уверены?
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
            Удалить
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
            Просмотр
          </MenuItem>
        )}
        <MenuItem onClick={onEdit}>Редактировать</MenuItem>
        <MenuItem onClick={popover.handleOpen}>Удалить</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default MyPlaceMenu;
