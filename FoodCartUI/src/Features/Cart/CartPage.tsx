import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/configureStore";
import { addCartItemAsync, removeCartItemAsync } from "./CartSlice";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { response, status } = useAppSelector((state) => state.Cart);

  function handleAddItem(productId: number) {
    dispatch(addCartItemAsync({ productId: productId }));
  }

  function handleRemoveItem(productId: number, quantity: number, name: string) {
    dispatch(
      removeCartItemAsync({
        productId: productId,
        quantity: quantity,
        name: name,
      })
    );
  }

  if (!response.isSuccess)
    return <Typography variant="h5">Your Cart is Empty</Typography>;
  else if (response.result!.items.length <= 0)
    return <Typography variant="h5">Your Cart is Empty</Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response.result?.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src="http://picsum.photos/200"
                      alt={item.name}
                      style={{ height: 50, margin: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">Rs.{item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status ===
                      "PendingDeleteItem" + item.productId + "singledel"
                    }
                    onClick={() =>
                      handleRemoveItem(item.productId, 1, "singledel")
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === "PendingAddItem" + item.productId}
                    onClick={() => handleAddItem(item.productId)}
                    color="success"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "PendingDeleteItem" + item.productId + "del"
                    }
                    onClick={() =>
                      handleRemoveItem(item.productId, item.quantity, "del")
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
