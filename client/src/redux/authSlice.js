import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";



//register

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

//VERIFY OTP 

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, thunkAPI) => {
    try {
      const res = await api.post("/auth/verify-otp", otpData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

//login

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", credentials);
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// LOGOUT

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.post("/auth/logout");
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);
// SESSION CHECK

export const sessionCheck = createAsyncThunk(
  "auth/sessionCheck",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

// INITIAL STATE 

const initialState = {
  user: null,
  isAuthenticated: false,

  // otp flow
  otpPending: false,
  pendingEmail: null,

  // loading states
  loading: false,
  checkingAuth: true,

  error: null,
};



const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN */

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* REGISTER */

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPending = true;
        state.pendingEmail = action.payload.email;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* VERIFY OTP */

      .addCase(verifyOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})

      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPending = false;
        state.pendingEmail = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
      .addCase(logoutUser.pending, (state) => {
  state.loading = true;
})

      .addCase(logoutUser.fulfilled, (state) => {
  state.loading = false;
  state.user = null;
  state.isAuthenticated = false;
  state.otpPending = false;
  state.pendingEmail = null;
})

      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* SESSION CHECK */

      .addCase(sessionCheck.pending, (state) => {
        state.checkingAuth = true;
      })

      .addCase(sessionCheck.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(sessionCheck.rejected, (state) => {
  state.checkingAuth = false;
  state.user = null;
  state.isAuthenticated = false;
  state.error = null;
})
  },
});



export const { clearError } = authSlice.actions;
export default authSlice.reducer;