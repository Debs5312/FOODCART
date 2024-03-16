import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { clearResponse } from "../Features/Cart/CartSlice";
import { signOut } from "../Features/UserAccount/userSlice";
import { useAppDispatch, useAppSelector } from "../Store/configureStore";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.User);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick} sx={{ typography: "h6" }}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My FoodItems</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearResponse());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
