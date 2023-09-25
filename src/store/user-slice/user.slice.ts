import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { IUser } from "@/services/auth-service/user.interface";
import { LoginErrorEnum } from "@/services/auth-service/interfaces";
import {
  getUserDataThunk,
  loginThunk,
  logoutThunk,
  signupThunk,
} from "@/store/user-slice/thunks";
import localStorageFields from "@/shared/localStorageFields";

export enum ActiveAuthScreenEnum {
  LOGIN = 0,
  SIGNUP = 1,
}

interface IUserState {
  loading: boolean;
  loginRedirect: string | null;
  error: boolean | LoginErrorEnum;
  token: string | null;
  open: boolean;
  activeScreen: ActiveAuthScreenEnum;
  userData: IUser | null;
  logoutAfterExit: boolean;
}

const initialState: IUserState = {
  loading: false,
  loginRedirect: null,
  error: false,
  token: null,
  open: false,
  activeScreen: ActiveAuthScreenEnum.LOGIN,
  userData: null,
  logoutAfterExit: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeAuthScreen: (state, action: PayloadAction<ActiveAuthScreenEnum>) => {
      state.activeScreen = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logoutIfNotRememberMe: (state) => {
      if (state.logoutAfterExit) {
        localStorage.removeItem(localStorageFields.TOKEN);
        state.userData = null;
        state.token = null;
      }
    },
    closeAuth: (state) => {
      state.open = false;
      state.activeScreen = ActiveAuthScreenEnum.LOGIN;
      state.loginRedirect = null;
      state.error = false;
    },
    openAuth: (
      state,
      { payload }: PayloadAction<{ loginRedirect?: string; signup?: boolean }>
    ) => {
      state.open = true;
      state.loginRedirect = payload.loginRedirect || null;
      if (payload.signup) {
        state.activeScreen = ActiveAuthScreenEnum.SIGNUP;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
      state.error = false;
      state.token = null;
      state.logoutAfterExit = false;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.open = false;
      state.token = action.payload.token;
      state.loginRedirect = null;
      state.logoutAfterExit = !action.payload.rememberMe;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.loginRedirect = null;
      if (action.payload) {
        state.error = action.payload as LoginErrorEnum;
      } else {
        state.error = true;
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
      state.error = true;
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.userData = null;
      state.token = null;
    });
    builder.addCase(getUserDataThunk.pending, (state, action) => {
      state.userData = null;
    });
    builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(getUserDataThunk.rejected, (state, action) => {
      state.userData = null;
      state.token = null;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectUserState = createSelector(
  (state: RootState) => state,
  (s) => s.user
);
export const selectIsAuth = createSelector(selectUserState, (s) =>
  Boolean(s.token)
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

export const {
  changeAuthScreen,
  closeAuth,
  openAuth,
  logoutIfNotRememberMe,
  setToken,
} = userSlice.actions;

export default userSlice.reducer;
