import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../Items/Pagination";
import { store } from "../Store/configureStore";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config: any) => {
  const token = store.getState().User.user?.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response: any) => {
    await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error("Bad Request");
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 500:
        toast.error("Internal Serve Error");
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const catalog = {
  ProductList: (params: URLSearchParams) =>
    requests.get("Products/GetAllProducts", params),
  SingleProduct: (id: number) =>
    requests.get(`Products/GetSingleProduct?Id=${id}`),
  fetchFilters: () => requests.get("Products/filters"),
};

const cart = {
  GetCart: () => requests.get("Basket/GetCart"),
  AddItemToCart: (productId: number, quantity = 1) =>
    requests.post(
      `Basket/AddItemToCart?productId=${productId}&quantity=${quantity}`,
      {}
    ),
  RemoveItem: (productId: number, quantity = 1) =>
    requests.delete(
      `Basket/DeleteItem?productId=${productId}&quantity=${quantity}`
    ),
};

const user = {
  login: (values: any) => requests.post("User/login", values),
  register: (values: any) => requests.post("User/register", values),
  currentUser: () => requests.get("User/currentUser"),
};

const Agent = { catalog, cart, user };

export default Agent;
