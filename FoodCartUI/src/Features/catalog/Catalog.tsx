import { Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import CheckBox from "../../Components/CheckBox";
import AppPagination from "../../Components/Pagination";
import RadioButtonGroup from "../../Components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../Store/configureStore";
import {
  fetchFilters,
  getAllProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

const Catalog = () => {
  const allproducts = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.Catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(getAllProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) {
    return <Typography>Loading Products</Typography>;
  }

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={2}>
        <Paper sx={{ mb: 3 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 3, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
            }
            title="SORTED BY"
          />
        </Paper>
        <Paper sx={{ mb: 3, p: 2 }}>
          <CheckBox
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 3, p: 2 }}>
          <CheckBox
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <ProductList allproducts={allproducts} />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={10}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
};
export default Catalog;
