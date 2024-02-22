"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hideAlert,
  selectAlertIsShown,
  selectAlertProps,
  selectSnackbarProps,
} from "@/store/alerts-slice/alerts.slice";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import { AlertTitle } from "@mui/material";

const SnackbarAlert = () => {
  const dispatch = useAppDispatch();
  const isShown = useAppSelector(selectAlertIsShown);
  const alertProps = useAppSelector(selectAlertProps);
  const snackbarProps = useAppSelector(selectSnackbarProps);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <Snackbar {...snackbarProps} open={isShown} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        {...alertProps}
        elevation={6}
        sx={{ fontSize: "15px", fontWeight: 400, maxWidth: "500px" }}
      >
        <AlertTitle>{alertProps.title}</AlertTitle>
        {alertProps.description}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
