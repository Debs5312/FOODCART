import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../Features/about/AboutPage";
import Catalog from "../Features/catalog/Catalog";
import ProductDetails from "../Features/catalog/ProductDetails";
import ContactPage from "../Features/contact/ContactPage";
import HomePage from "../Features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "../Features/Cart/CartPage";
import { CheckoutPage } from "../Features/Checkout/CheckoutPage";
import { useAppDispatch } from "../Store/configureStore";
import { fetchCartAsync } from "../Features/Cart/CartSlice";
import Login from "../Features/UserAccount/Login";
import Register from "../Features/UserAccount/Register";
import { fetchCurrentUser } from "../Features/UserAccount/userSlice";
import PrivateRoute from "./PrivateRoute";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const startApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    startApp().then(() => setLoading(false));
  }, [startApp]);

  const [darkMode, setMode] = useState(false);
  function SetMode() {
    setMode(!darkMode);
  }
  const Mode = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: Mode,
      background: {
        default: Mode === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  if (loading) return <Typography variant="h5">Initializing App...</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} setMode={SetMode} />
      <Container>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/catalog/:id" component={ProductDetails} />
        <Route path="/cart" component={CartPage} />
        <PrivateRoute path="/checkout" component={CheckoutPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
