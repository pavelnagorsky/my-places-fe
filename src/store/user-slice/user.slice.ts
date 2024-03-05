import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { IUser } from "@/services/user-service/interfaces/user.interface";
import {
  ILoginError,
  LoginErrorEnum,
} from "@/services/auth-service/interfaces";
import {
  getUserDataThunk,
  loginThunk,
  logoutThunk,
  signupThunk,
} from "@/store/user-slice/thunks";

export enum ActiveAuthScreenEnum {
  LOGIN = 0,
  SIGNUP = 1,
}

interface IUserState {
  loading: boolean;
  loginRedirect: string | null;
  error: false | ILoginError;
  open: boolean;
  activeScreen: ActiveAuthScreenEnum;
  userData: IUser | null;
  redirectHomeOnCancelLogin: boolean;
  wasManuallyLoggedIn: boolean;
}

const initialState: IUserState = {
  loading: false,
  loginRedirect: null,
  error: false,
  open: false,
  activeScreen: ActiveAuthScreenEnum.LOGIN,
  userData: null,
  redirectHomeOnCancelLogin: false,
  wasManuallyLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeAuthScreen: (state, action: PayloadAction<ActiveAuthScreenEnum>) => {
      state.activeScreen = action.payload;
    },
    closeAuth: (state) => {
      state.open = false;
      state.activeScreen = ActiveAuthScreenEnum.LOGIN;
      state.redirectHomeOnCancelLogin = false;
      state.loginRedirect = null;
      state.error = false;
    },
    openAuth: (
      state,
      {
        payload,
      }: PayloadAction<{
        loginRedirect?: string;
        signup?: boolean;
        redirectHomeOnCancel?: boolean;
      }>
    ) => {
      state.open = true;
      state.loginRedirect = payload.loginRedirect || null;
      state.redirectHomeOnCancelLogin = Boolean(payload.redirectHomeOnCancel);
      if (payload.signup) {
        state.activeScreen = ActiveAuthScreenEnum.SIGNUP;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.open = false;
      state.loginRedirect = null;
      state.wasManuallyLoggedIn = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.loginRedirect = null;
      if (action.payload) {
        state.error = action.payload as ILoginError;
      } else {
        state.error = {
          message: "Error",
        };
      }
    });
    builder.addCase(signupThunk.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.activeScreen = ActiveAuthScreenEnum.LOGIN;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = {
        message: "Error",
      };
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.userData = null;
    });
    builder.addCase(getUserDataThunk.pending, (state, action) => {
      state.userData = null;
    });
    builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(getUserDataThunk.rejected, (state, action) => {
      state.userData = null;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectUserState = createSelector(
  (state: RootState) => state,
  (s) => s.user
);
export const selectIsAuth = createSelector(selectUserState, (s) =>
  Boolean(s.userData)
);
export const selectAuthLoading = createSelector(
  selectUserState,
  (s) => s.loading
);
export const selectUserData = createSelector(
  selectUserState,
  (s) => s.userData
);
export const selectAuthActiveScreen = createSelector(
  selectUserState,
  (s) => s.activeScreen
);
export const selectAuthOpen = createSelector(selectUserState, (s) => s.open);
export const selectAuthError = createSelector(selectUserState, (s) => s.error);
export const selectAuthCloseRedirect = createSelector(
  selectUserState,
  (s) => s.redirectHomeOnCancelLogin
);
export const selectChangeLanguage = createSelector(selectUserState, (s) => {
  if (!!s.userData?.preferredLanguage && s.wasManuallyLoggedIn) return true;
  return false;
});

export const selectUserPreferredLanguage = createSelector(
  selectUserData,
  (s) => {
    return s?.preferredLanguage ?? null;
  }
);
export const selectUserRoles = createSelector(
  selectUserData,
  (s) => s?.roles || []
);
export const selectUserId = createSelector(
  selectUserData,
  (s) => s?.id || null
);

export const { changeAuthScreen, closeAuth, openAuth } = userSlice.actions;

export default userSlice.reducer;
