import {
  ButtonProps,
  Popover,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { StyledButton } from "../UI/button/StyledButton";

interface IConfirmPopupProps {
  popoverProps: {
    anchor: null | Element;
    open: boolean;
    id?: string;
    handleClose: () => void;
  };
  actionText: string;
  cancelText?: string;
  title: string;
  onSubmit: () => void;
  color?: "primary" | "error";
  sx?: SxProps;
  cancelButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
}

const ConfirmPopup = ({
  popoverProps,
  actionText,
  cancelText,
  title,
  onSubmit,
  sx,
  color,
  cancelButtonProps,
  submitButtonProps,
}: IConfirmPopupProps) => {
  const { t } = useTranslation();

  const onClickAction = () => {
    popoverProps.handleClose();
    onSubmit();
  };

  return (
    <Popover
      open={popoverProps.open}
      id={popoverProps.id}
      onClose={popoverProps.handleClose}
      anchorEl={popoverProps.anchor}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "15px",
            p: "1em",
          },
        },
      }}
    >
      <Stack gap={"1em"} maxWidth={"220px"} sx={sx}>
        <Typography fontWeight={600} fontSize={"18px"} textAlign={"center"}>
          {title}
        </Typography>
        <Stack
          className={"buttons-row"}
          direction={"row"}
          justifyContent={"space-between"}
          gap={"1em"}
        >
          <StyledButton
            sx={{ fontSize: "16px" }}
            fullWidth
            {...cancelButtonProps}
            onClick={popoverProps.handleClose}
          >
            {cancelText || t("buttons.cancel")}
          </StyledButton>
          <StyledButton
            fullWidth
            sx={{ fontSize: "16px" }}
            color={color || "error"}
            variant={"contained"}
            {...submitButtonProps}
            onClick={onClickAction}
          >
            {actionText}
          </StyledButton>
        </Stack>
      </Stack>
    </Popover>
  );
};

export default ConfirmPopup;
