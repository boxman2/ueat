import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  msg: "",
};

export const __signUp = createAsyncThunk(
  "auth/signUp",
  async ({ nickname, email, password, passwordConfirm }, thunkAPI) => {
    try {
      const a = { nickname, email, password, passwordConfirm };
      const postSignup = await axios.post(
        "https://sparta.goguma.online/auth/register",
        a
      );
      console.log("π ~ file: signupSlice.js:21 ~ postSignup", postSignup);
      return thunkAPI.fulfillWithValue(postSignup.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // λ¦¬λμ ν¨μ μ μ
  },
  extraReducers: {
    [__signUp.pending]: (state) => {
      state.isLoading = true; // λ€νΈμν¬ μμ²­μ΄ μμλλ©΄ λ‘λ©μνλ₯Ό trueλ‘ λ³κ²½ν©λλ€.
    },
    [__signUp.fulfilled]: (state, action) => {
      // API μμ²­μ΄ μ±κ³΅ν κ²½μ° μνλ₯Ό API μλ΅ λ°μ΄ν°λ‘ μλ°μ΄νΈ
      state.msg = action.payload;
      state.isLoading = false;
    },
    [__signUp.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { postSignup } = authSlice.actions;

export default authSlice.reducer;
