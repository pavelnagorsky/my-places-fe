import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginError,
  ILoginRequest,
  ISignupRequest,
  LoginErrorEnum,
} from "@/services/auth-service/interfaces";
import authService from "@/services/auth-service/auth.service";
import localStorageFields from "@/shared/localStorageFields";
import { RootState } from "@/store/store";
import userService from "@/services/user-service/user.service";

export const getUserDataThunk = createAsyncThunk(
  "user/get-user-data",
  async (arg, thunkAPI) => {
    try {
      const { data } = await userService.getUserData();
      return data;
    } catch (e) {
      localStorage.removeItem(localStorageFields.TOKEN);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const autoLoginThunk = createAsyncThunk(
  "auth/auto-login",
  (arg, thunkAPI) => {
    const lcToken = localStorage.getItem(localStorageFields.TOKEN);
    if (lcToken) thunkAPI.dispatch(getUserDataThunk());
    return;
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (
    payload: ILoginRequest & {
      onRedirect: (path: string) => void;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await authService.login(payload);
      const loginRedirect = (thunkAPI.getState() as RootState).user
        .loginRedirect;

      // save token in storage
      localStorage.setItem(localStorageFields.TOKEN, data.token);

      thunkAPI.dispatch(getUserDataThunk());
      if (loginRedirect) {
        await payload.onRedirect(loginRedirect);
      }

      return { ...data, rememberMe: payload.rememberMe };
    } catch (e: any) {
      // parse reason (invalid data | email not confirmed)
      return thunkAPI.rejectWithValue(
        (e?.response?.data as ILoginError) || null
      );
    }
  }
);

export const signupThunk = createAsyncThunk(
  "user/signup",
  async (payload: ISignupRequest & { onSuccess: () => void }, thunkAPI) => {
    const { data } = await authService.signup(payload);
    payload.onSuccess();
    return data;
  }
);

export const logoutThunk = createAsyncThunk("user/logout", async (thunkAPI) => {
  authService
    .logout()
    .then(() => {})
    .catch((e) => {
      console.log("logout error", e);
    });
  // clear token
  localStorage.removeItem(localStorageFields.TOKEN);
  return;
});
