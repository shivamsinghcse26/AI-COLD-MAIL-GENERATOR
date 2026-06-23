import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const generateEmail = createAsyncThunk(
  "ai/generateEmail",
  async (prompt, thunkAPI) => {
    try {
      const res = await api.post("/ai/generate-email", {
        prompt,
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Generation failed",
      );
    }
  },
);

const initialState = {
  result: null,
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearResult: (state) => {
      state.result = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // generate pending
      .addCase(generateEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null; // clear old result
      })

      // generate success
      .addCase(generateEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })

      // generate failed
      .addCase(generateEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const { clearError, clearResult } = aiSlice.actions;
export default aiSlice.reducer;
