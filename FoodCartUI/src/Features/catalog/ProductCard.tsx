import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IProduct } from "../../Items/Product";
import { useAppDispatch, useAppSelector } from "../../Store/configureStore";
import { addCartItemAsync } from "../Cart/CartSlice";

interface props {
  item: IProduct;
}

export default function ProductCard({ item }: props) {
  const { status } = useAppSelector((state) => state.Cart);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {item.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={item.name}
        titleTypographyProps={{ variant: "h5", fontwidth: "bold" }}
      />
      <CardMedia
        component="img"
        height="140"
        image="http://picsum.photos/200"
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.brand} / {item.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status === "PendingAddItem" + item.id}
          onClick={() => dispatch(addCartItemAsync({ productId: item.id }))}
          size="small"
        >
          Add to Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${item.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
