import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ISignupRequest,
  LoginErrorEnum,
} from "@/services/auth-service/interfaces";
import authService from "@/services/auth-service/auth.service";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (payload: ILoginRequest, thunkAPI) => {
    try {
      const { data } = await authService.login(payload);
      return data;
    } catch (e: any) {
      // parse reason (invalid data | email not confirmed)
      return thunkAPI.rejectWithValue(
        (e?.response?.data?.loginError as LoginErrorEnum) || null
      );
    }
  }
);

export const signupThunk = createAsyncThunk(
  "user/signup",
  async (payload: ISignupRequest, thunkAPI) => {
    const { data } = await authService.signup(payload);
    return data;
  }
);

export const logoutThunk = createAsyncThunk("user/logout", async (thunkAPI) => {
  // clear token
  return;
});
