import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { AlertProps, SnackbarProps } from "@mui/material";
import {
  ICustomAlertProps,
  ICustomSnackbarProps,
} from "@/store/alerts-slice/interfaces";

interface IAlertsState {
  show: boolean;
  snackbarProps: SnackbarProps;
  alertProps: AlertProps & { description?: string };
}

const initialState: IAlertsState = {
  show: false,
  snackbarProps: {
    color: "success",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    autoHideDuration: 6000,
  },
  alertProps: {
    variant: "filled",
    severity: "info",
  },
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlert: (
      state,
      {
        payload,
      }: PayloadAction<{
        snackbarProps: ICustomSnackbarProps;
        alertProps: ICustomAlertProps;
      }>
    ) => {
      state.show = true;
      state.alertProps = { ...state.alertProps, ...payload.alertProps };
      state.snackbarProps = {
        ...state.snackbarProps,
        ...payload.snackbarProps,
      };
    },
    hideAlert: (state) => {
      state.show = false;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectAlertsState = createSelector(
  (state: RootState) => state,
  (s) => s.alerts
);
export const selectAlertIsShown = createSelector(
  selectAlertsState,
  (s) => s.show
);
export const selectAlertProps = createSelector(
  selectAlertsState,
  (s) => s.alertProps
);
export const selectSnackbarProps = createSelector(
  selectAlertsState,
  (s) => s.snackbarProps
);

export const { showAlert, hideAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
