import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  data: number;
}

const initialState: CounterState = {
  data: 105,
};

// export default function counterReducer(state = initialState, action: any) {
//   return state;
// }

export const counterReducer = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = counterReducer.actions;
