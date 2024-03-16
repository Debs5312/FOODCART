import { IProduct } from "./Product";

export interface IResponseSingle {
  isSuccess: boolean;
  result: IProduct | null;
  displayMessage: string;
  errorMessage: Array<string> | null;
}
