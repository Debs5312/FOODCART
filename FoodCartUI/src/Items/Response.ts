import { IProduct } from "./Product";

export interface IResponse {
  isSuccess: boolean;
  result: Array<IProduct> | [];
  displayMessage: string;
  errorMessage: Array<string> | null;
}
