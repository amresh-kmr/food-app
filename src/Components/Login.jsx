import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { CartState } from "../App";

export default function Login({ open, setOpen, value, setValue }) {
  const { user } = CartState();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (user) {
      handleClose();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            fontSize: "2.25rem",
            textAlign: "center",
            color: "darkcyan",
            pb: 0,
          }}
        >
          {value === 0 ? "Login Here" : "Sign Up"}
        </DialogTitle>
        {value === 0 ? (
          <LoginForm handleClose={handleClose} setValue={setValue} />
        ) : (
          <SignUpForm handleClose={handleClose} setValue={setValue} />
        )}
      </Dialog>
    </div>
  );
}
