import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IResponseCart } from "../../Items/ResponseCart";
import Agent from "../../Layout/Agent";
import { getCookie } from "../../Util/Cookie";

interface CartState {
  response: IResponseCart;
  status: String;
}

const initialState: CartState = {
  response: {
    isSuccess: false,
    result: null,
    displayMessage: "",
    errorMessage: null,
  },
  status: "idle",
};

export const fetchCartAsync = createAsyncThunk<IResponseCart>(
  "Cart/fetchCartAsync",
  async (_, thunkAPI) => {
    try {
      return await Agent.cart.GetCart();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("UserId")) return false;
    },
  }
);

export const addCartItemAsync = createAsyncThunk<
  IResponseCart,
  { productId: number; quantity?: number }
>("Cart/addCartItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    return await Agent.cart.AddItemToCart(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const removeCartItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("Cart/removeCartItemAsync", async ({ productId, quantity }) => {
  try {
    return await Agent.cart.RemoveItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    clearResponse: (state) => {
      state.response.isSuccess = false;
      state.response.result = null;
      state.response.displayMessage = "cleard";
      state.response.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItemAsync.pending, (state, action) => {
      state.status = "PendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.status =
        "PendingDeleteItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.response.result?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.response.result!.items[itemIndex].quantity -= quantity;
      if (state.response.result!.items[itemIndex].quantity === 0) {
        state.response.result!.items.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeCartItemAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addMatcher(
      isAnyOf(addCartItemAsync.fulfilled, fetchCartAsync.fulfilled),
      (state, action) => {
        state.response = action.payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      isAnyOf(addCartItemAsync.rejected, fetchCartAsync.rejected),
      (state) => {
        state.status = "idle";
      }
    );
  },
});

export const { setResponse, clearResponse } = cartSlice.actions;
