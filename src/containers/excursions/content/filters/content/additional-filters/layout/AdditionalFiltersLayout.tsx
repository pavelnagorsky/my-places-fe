import { PropsWithChildren } from "react";
import { IPopoverProps } from "@/components/confirm-popup/ConfirmPopup";
import {
  Dialog,
  Drawer,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterTransition from "@/components/UI/transitions/FilterTransition";
import CloseIcon from "@mui/icons-material/Close";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { useTranslation } from "next-i18next";

interface IAdditionalFiltersLayoutProps extends PropsWithChildren {
  popoverProps: IPopoverProps;
}

const AdditionalFiltersLayout = ({
  popoverProps,
  children,
}: IAdditionalFiltersLayoutProps) => {
  const { t } = useTranslation("excursion-management");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Dialog
        TransitionComponent={FilterTransition}
        fullScreen
        onClose={popoverProps.handleClose}
        open={popoverProps.open}
        id={popoverProps.id}
      >
        <Stack
          position={"sticky"}
          py={"0.5em"}
          px={"1em"}
          top={0}
          zIndex={1}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ backgroundColor: primaryBackground }}
          alignItems={"center"}
        >
          <Typography fontWeight={600} fontSize={"20px"}>
            {t("filters.title", { ns: "common" })}
          </Typography>
          <IconButton onClick={popoverProps.handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Dialog>
    );
  }
  return (
    <Popover
      open={popoverProps.open}
      onClose={popoverProps.handleClose}
      id={popoverProps.id}
      anchorEl={popoverProps.anchor}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "15px",
            maxHeight: "500px",
            width: { xs: "100%", sm: "550px" },
          },
        },
      }}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
    >
      {children}
    </Popover>
  );
};

export default AdditionalFiltersLayout;
