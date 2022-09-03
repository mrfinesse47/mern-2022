import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'));
//token is in there as well check redux dev tools to see

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// login new user

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user); //this return shows up as the action.payload
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message); //same thing in action.payload
  }
});

// Register new user

export const register = createAsyncThunk(
  'auth/register',
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

//Logout user

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await authService.logout();
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
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
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
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
