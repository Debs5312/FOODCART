import { AddShoppingCartRounded, ThumbUp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../Store/configureStore";
import { addCartItemAsync } from "../Cart/CartSlice";
import { getSingleProductsAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const BaseUrl = "../../Images/";
  const response1 = useAppSelector((state) => state.Cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const response = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );
  const { status, productsLoaded } = useAppSelector((state) => state.Catalog);

  useEffect(() => {
    if (!response) dispatch(getSingleProductsAsync(parseInt(id)));
  }, [id, response, dispatch]);

  if (status.includes("PendingFetchProduct"))
    return <Typography variant="h5">Loading....</Typography>;
  if (!productsLoaded && status.includes("idle")) {
    toast.error("Item not found.", { toastId: id });
    return (
      <Typography variant="h5" color="inherit">
        Item not found.
      </Typography>
    );
  } else {
    toast.success("Item found.", { toastId: id });
    var item = response!;
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img
            src={BaseUrl + item.pictureUrl}
            alt={item.name}
            style={{ width: "80%", padding: "10px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3" align="center" sx={{ mb: 2 }}>
            {item.name}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box
            display="flex"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h5" color="text.primary">
                Rs. {item.price}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton
                size="large"
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: green[500],
                  },
                  "&.active": {
                    color: "secondary.dark",
                  },
                }}
              >
                <Badge color="secondary">
                  <ThumbUp />
                </Badge>
              </IconButton>
              <LoadingButton
                loading={response1.status === "PendingAddItem" + item.id}
                onClick={() =>
                  dispatch(addCartItemAsync({ productId: item.id }))
                }
                size="large"
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: red[500],
                  },
                  "&.active": {
                    color: "secondary.dark",
                  },
                }}
              >
                <AddShoppingCartRounded />
              </LoadingButton>
            </Box>
          </Box>
          <Divider sx={{ mu: 2, mb: 3 }} />
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{item.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in Stock</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}
