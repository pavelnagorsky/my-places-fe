import { AlertProps } from "@mui/material";

export interface ICustomAlertProps
  extends Pick<AlertProps, "color">,
    Pick<AlertProps, "severity">,
    Pick<AlertProps, "variant"> {
  title: string;
  description?: string;
}

export interface ICustomSnackbarProps {
  autoHideDuration?: number;
}
