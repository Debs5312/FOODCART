import { Cart } from "./Cart";

export interface IResponseCart {
  isSuccess: boolean;
  result: Cart | null;
  displayMessage: string;
  errorMessage: Array<string> | null;
}
