import { Grid } from "@mui/material";
import { IProduct } from "../../Items/Product";
import { useAppSelector } from "../../Store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface props {
  allproducts: IProduct[];
}
export default function ProductList({ allproducts }: props) {
  const { productsLoaded } = useAppSelector((state) => state.Catalog);
  return (
    <Grid container spacing={3}>
      {allproducts.map((items) => (
        <Grid item xs={4} key={items.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard item={items} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
