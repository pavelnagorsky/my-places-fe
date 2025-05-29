import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginError,
  ILoginRequest,
  ISignupRequest,
  ITokenResponse,
  LoginErrorEnum,
} from "@/services/auth-service/interfaces/interfaces";
import authService from "@/services/auth-service/auth.service";
import localStorageFields from "@/shared/localStorageFields";
import { RootState } from "@/store/store";
import userService from "@/services/user-service/user.service";
import { googleLogout } from "@react-oauth/google";
import { AxiosResponse } from "axios";

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
    if (lcToken) {
      thunkAPI.dispatch(getUserDataThunk());
      return thunkAPI.fulfillWithValue(lcToken);
    }
    return thunkAPI.rejectWithValue(null);
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

export const oauthLoginThunk = createAsyncThunk(
  "user/oauth-login",
  async (
    payload: {
      apiCall: () => Promise<AxiosResponse<ITokenResponse>>;
      onRedirect: (path: string) => void;
      onError?: (error: any) => void;
    },
    thunkAPI
  ) => {
    try {
      const loginRedirect = (thunkAPI.getState() as RootState).user
        .loginRedirect;

      const { data } = await payload.apiCall();

      // save token in storage
      localStorage.setItem(localStorageFields.TOKEN, data.token);

      thunkAPI.dispatch(getUserDataThunk());
      if (loginRedirect) {
        await payload.onRedirect(loginRedirect);
      }

      return data;
    } catch (e: any) {
      if (typeof payload.onError === "function") payload.onError(e);
      return thunkAPI.rejectWithValue(null);
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
  googleLogout();
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
