import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IResponseCart } from "../Items/ResponseCart";

interface StoreContextValue {
  response: IResponseCart;
  setResponse: (ResponseCart: IResponseCart) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("We are not inside a provider ");
  }
  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [response, setResponse] = useState<IResponseCart>({
    isSuccess: false,
    result: null,
    displayMessage: "",
    errorMessage: null,
  });

  function removeItem(productId: number, quantity: number) {
    if (!response.isSuccess) return;
    if (response.result != null) {
      const items = [...response.result.items];
      const itemIndex = items.findIndex((i) => i.productId === productId);
      if (itemIndex >= 0) {
        items[itemIndex].quantity -= quantity;
        if (items[itemIndex].quantity === 0) {
          items.splice(itemIndex, 1);
        }
        response.result.items = items;
        setResponse((prevState) => {
          return { ...prevState, response };
        });
      }
    }
  }
  return (
    <StoreContext.Provider value={{ response, setResponse, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
