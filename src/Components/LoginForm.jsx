import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { CartState } from "../App";

export default function LoginForm({ handleClose, setValue }) {
  const { users, setUser } = CartState();
  const [err, setErr] = useState("");

  const handleSubmit = ({ email, password }, { setSubmitting }) => {
    setErr("");
    setTimeout(() => {
      console.log(JSON.stringify({ email, password }, null, 2));
      if (email in users) {
        users[email] === password ? setUser(email) : setErr(`Wrong Password`);
      } else {
        //Error User does't exits
        setErr(`User with email id: ${email} does't exits.`);
      }
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <DialogContent>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Please Enter Email";
            }
            if (!values.password) {
              errors.password = "Please Enter Password";
            }
            return errors;
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter Email Here"
                type="email"
                fullWidth
                name="email"
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="error" />
              <TextField
                margin="dense"
                id="password"
                label="Enter Password Here"
                type="password"
                fullWidth
                name="password"
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="div" className="error" />

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </DialogActions>
              <Typography textAlign="center">
                Don't have an account?{" "}
                <Button onClick={() => setValue((prev) => 1)}>
                  SignUp here
                </Button>
              </Typography>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}
