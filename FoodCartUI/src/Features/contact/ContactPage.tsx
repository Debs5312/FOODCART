import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";

export default function ContactPage() {
  const { data } = useSelector((state: CounterState) => state);
  return <Typography variant="h5">{data}</Typography>;
}
