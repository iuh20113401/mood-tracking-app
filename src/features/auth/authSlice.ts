import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ACCOUNTS } from "../../constants/accounts";
type User = {
  id: number;
  username: string;
  name: string;
  image: string | null;
  age: number;
  gender: number;
};
type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const account = ACCOUNTS.find((item) => item.username === payload.email);
      if (!account) {
        throw new Error("Không có tài khoản với email này.");
      }
      if (account.password !== payload.password) {
        throw new Error("Sai thông tin mật khẩu vui lòng thử lại!");
      }
      return account;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, action) => {
        s.loading = false;
        s.user = { username: action.payload.username, ...action.payload.user };
      })
      .addCase(login.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
