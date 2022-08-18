import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { CartState } from "../App";

export default function Login({ open, setOpen, value }) {
  const { user } = CartState();
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{value === 0 ? "Login Here" : "Sign Up"}</DialogTitle>
        {value === 0 ? (
          <LoginForm handleClose={handleClose} />
        ) : (
          <SignUpForm handleClose={handleClose} />
        )}
      </Dialog>
    </div>
  );
}
