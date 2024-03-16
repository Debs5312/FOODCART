import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { MetaData } from "../../Items/Pagination";
import { IProduct, ProductParams } from "../../Items/Product";
import { IResponse } from "../../Items/Response";
import { IResponseSingle } from "../../Items/ResponseSingle";
import Agent from "../../Layout/Agent";
import { RootState } from "../../Store/configureStore";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.brands.length > 0)
    params.append("brands", productParams.brands.toString());
  if (productParams.types.length > 0)
    params.append("types", productParams.types.toString());
  return params;
}

const productAdapter = createEntityAdapter<IProduct>();

export const getAllProductsAsync = createAsyncThunk<
  IResponse,
  void,
  { state: RootState }
>("Catalog/getAllProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().Catalog.productParams);
  try {
    const response = await Agent.catalog.ProductList(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getSingleProductsAsync = createAsyncThunk<IResponseSingle, number>(
  "Catalog/getSingleProductAsync",
  async (id, thunkAPI) => {
    try {
      return await Agent.catalog.SingleProduct(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "Catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return Agent.catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function getParams() {
  return {
    orderBy: "name",
    pageNumber: 1,
    pageSize: 6,
    types: [],
    brands: [],
  };
}

export const catalogSlice = createSlice({
  name: "Catalog",
  initialState: productAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: getParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    resetProductParams: (state) => {
      state.productParams = getParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.pending, (state) => {
      state.status = "PendingFetchProducts";
    });
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload.result);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(getSingleProductsAsync.pending, (state) => {
      state.status = "PendingFetchProduct";
    });
    builder.addCase(getSingleProductsAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload.result!);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(getSingleProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.Catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;
