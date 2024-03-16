import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";
import { IResponseCart } from "../../Items/ResponseCart";
import { User } from "../../Items/User";
import Agent from "../../Layout/Agent";
import { setResponse } from "../Cart/CartSlice";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "User/signIn",
  async (data, thunkAPI) => {
    try {
      const userDTO = await Agent.user.login(data);
      const { basket, ...user } = userDTO;
      if (basket) {
        var response: IResponseCart = {
          isSuccess: true,
          result: basket,
          displayMessage: "hurray",
          errorMessage: null,
        };
        thunkAPI.dispatch(setResponse(response));
      }
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "User/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDTO = await Agent.user.currentUser();
      const { basket, ...user } = userDTO;
      if (basket) {
        var response: IResponseCart = {
          isSuccess: true,
          result: basket,
          displayMessage: "hurray",
          errorMessage: null,
        };
        thunkAPI.dispatch(setResponse(response));
      }
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      history.push("/catalog");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session Expired. Please login again.");
      history.push("/login");
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      toast.success("Succesfully Logged In!");
    });
    builder.addMatcher(isAnyOf(fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      console.log(action.payload);
      toast.error("Wrong Credentials! Please Login Again.");
    });
  },
});

export const { signOut, setUser } = userSlice.actions;
