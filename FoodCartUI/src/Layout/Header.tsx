import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../Store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface props {
  darkMode: boolean;
  setMode: () => void;
}

const leftLinks = [
  { title: "menu", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
  textDecoration: "none",
};

export default function Header({ darkMode, setMode }: props) {
  const { response } = useAppSelector((state) => state.Cart);
  const { user } = useAppSelector((state) => state.User);
  const itemCount = response.result?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography
              variant="h5"
              component={NavLink}
              to="/"
              exact
              sx={navStyles}
            >
              BONDHU CATERER
            </Typography>
            <Switch checked={darkMode} onChange={setMode} />
          </Box>

          <List sx={{ display: "flex" }}>
            {leftLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display="flex" alignItems="center">
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              sx={{ color: "inherit" }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (
              <SignedInMenu />
            ) : (
              <List sx={{ display: "flex" }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
