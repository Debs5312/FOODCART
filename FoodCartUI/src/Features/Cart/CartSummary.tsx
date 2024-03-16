import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useAppSelector } from "../../Store/configureStore";

interface Props {
  subtotal?: number;
}

export default function CartSummary({ subtotal }: Props) {
  const { response } = useAppSelector((state) => state.Cart);
  if (subtotal === undefined)
    subtotal =
      response.result?.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ) ?? 0;
  const deliveryFee = subtotal > 500 ? 0 : (subtotal * 2) / 100;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="right">{subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Delivery fee*</TableCell>
              <TableCell align="right">{deliveryFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">
                {Math.ceil(subtotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over Rs.500 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
