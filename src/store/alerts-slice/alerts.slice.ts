import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { AlertProps, SnackbarProps } from "@mui/material";
import {
  ICustomAlertProps,
  ICustomSnackbarProps,
} from "@/store/alerts-slice/interfaces";
import { ReactNode } from "react";
import utils from "@/shared/utils";

interface IAlertsState {
  show: boolean;
  snackbarProps: SnackbarProps;
  alertProps: AlertProps & { description?: string | ReactNode };
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

export const showAlertThunk = createAsyncThunk(
  "alerts/show",
  async (
    payload: {
      snackbarProps: ICustomSnackbarProps;
      alertProps: ICustomAlertProps;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(hideAlert());
    // Small delay to ensure state update
    await utils.delay(100);
    return payload;
  }
);

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.show = false;
      state.alertProps.description = undefined;
      state.snackbarProps.autoHideDuration = 6000;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(showAlertThunk.fulfilled, (state, { payload }) => {
      state.show = true;
      state.alertProps = { ...state.alertProps, ...payload.alertProps };
      state.snackbarProps = {
        ...state.snackbarProps,
        ...payload.snackbarProps,
      };
    });
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

export const { hideAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
