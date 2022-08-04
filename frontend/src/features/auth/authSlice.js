import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//get user from local storage
const user = JSON.parse(localStorage.getItem("user"));
//token is in there as well check redux dev tools to see

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new user

//is the first argument just for the redux tools??
// i changed it to auth/registeaaaa or some garbage and it worked,
// just had different name
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString();

      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  console.log(user);
});

//Logout user

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await authService.logout();
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    //i decided to write without async logic
    logout: (state) => {
      authService.logout();
      state.user = null;
    },
  },
  //the extra reducers are for your pending accepted rejected states as seen in the
  //redux developer tools in the browser

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
    // for some reason the tutorial used an async function to log out
  },
});

export const { reset, logout } = authSlice.actions;
//any action created in the authslice you must not forget to export
export default authSlice.reducer;
