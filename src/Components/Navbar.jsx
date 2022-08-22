import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Login from "./Login";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartState } from "../App";
import MyDrawer from "./MyDrawer";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

export default function Navbar() {
  const { cart, user, setUser } = CartState();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleClickOpen = (val) => {
    setOpen(true);
    setValue(val);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "mediumseagreen" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LunchDiningIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Food App
          </Typography>
          {!user ? (
            <>
              <Button color="inherit" onClick={() => handleClickOpen(0)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => handleClickOpen(1)}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Typography>{user}</Typography>
              <Button
                sx={{ color: "white", ml: "10px" }}
                onClick={() => setUser("")}
              >
                logout
              </Button>
            </>
          )}
          <Login
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
          />
          <Badge badgeContent={cart.length} color="secondary">
            <IconButton
              onClick={() => {
                setDrawerOpen((prev) => !prev);
              }}
              sx={{ padding: "4px" }}
            >
              <ShoppingCartIcon color="action" />
            </IconButton>
          </Badge>
          <MyDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
