import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../Features/Cart/CartSlice";
import { catalogSlice } from "../Features/catalog/catalogSlice";
import { counterReducer } from "../Features/contact/counterReducer";
import { userSlice } from "../Features/UserAccount/userSlice";

// export function configureStore() {
//   return createStore(counterReducer);
// }

export const store = configureStore({
  reducer: {
    Counter: counterReducer.reducer,
    Cart: cartSlice.reducer,
    Catalog: catalogSlice.reducer,
    User: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
