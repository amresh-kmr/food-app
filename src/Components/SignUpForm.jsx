import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { CartState } from "../App";
function getObject({ email, firstName, lastName, mobileNo, address, pincode }) {
  return { email, firstName, lastName, mobileNo, address, pincode };
}
let address = {
  kormangala: 560064,
  btm: 560068,
  anjananagar: 560091,
  bansankhri: 560075,
  madiwala: 760064,
  patna: 580064,
};
let timer;
export default function SignUpForm({ handleClose }) {
  const { setUsers, users, setUser, id, setId } = CartState();
  const [err, setErr] = useState("");

  const handleSubmit = (values, { setSubmitting }) => {
    setErr("");
    setTimeout(() => {
      if (
        Object.values(users)
          .map((item) => item.email)
          .includes(values.email)
      ) {
        setErr(`User with email ${values.email} Already in database.`);
      } else {
        console.log(
          JSON.stringify(
            values,
            [
              "firstName",
              "lastName",
              "mobileNo",
              "email",
              "address",
              "pincode",
            ],
            2
          )
        );
        setUsers((prev) => {
          setId((prev) => prev + 1);
          return { ...prev, [id]: getObject(values) };
        });
        setUser(values.email);
      }
      setSubmitting(false);
    }, 5000);
  };

  return (
    <>
      <DialogContent>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            password: "",
            ["confirm-password"]: "",
            firstName: "",
            lastName: "",
            mobileNo: null,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Please Enter Email";
            }
            if (!values.password) {
              errors.password = "Please Enter Password";
            }
            if (!values.address) {
              errors.password = "Please Enter Address";
            }
            if (!values.address) {
              errors.address = "Please Enter Address";
            }
            if (!values.firstName) {
              errors.firstName = "Please Enter First Name";
            }
            if (!values.lastName) {
              errors.lastName = "Please Enter Last Name";
            }
            if (!values["confirm-password"]) {
              errors["confirm-password"] = "Please Enter Password Here";
            }
            if (
              values["confirm-password"] &&
              values["confirm-password"] !== values.password
            ) {
              errors["confirm-password"] = "Password Did not Matched";
            }

            return errors;
          }}
        >
          {({ isSubmitting, handleChange, setFieldValue, values }) => (
            <Form>
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="Enter First Name"
                type="Text"
                fullWidth
                name="firstName"
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="error" />
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Enter Last Name "
                type="text"
                fullWidth
                name="lastName"
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="error" />
              <TextField
                autoFocus
                margin="dense"
                id="mobileNo"
                label="Enter Mobile Number"
                type="tel"
                fullWidth
                name="mobileNo"
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="error" />
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Enter Address"
                type="text"
                fullWidth
                name="address"
                variant="standard"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("pincode", "");

                  clearTimeout(timer);
                  timer = setTimeout(() => {
                    let pin =
                      address[
                        Object.keys(address).find(
                          (item) => item === e.target.value
                        )
                      ];
                    setFieldValue("pincode", pin);
                  }, 500);
                }}
              />
              <ErrorMessage name="address" component="div" className="error" />
              <TextField
                autoFocus
                margin="dense"
                id="pincode"
                label={values.pincode ? "" : "Enter Pincode"}
                type="text"
                fullWidth
                name="pincode"
                value={values.pincode}
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage name="pincode" component="div" className="error" />
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
              <TextField
                margin="dense"
                id="confirm-password"
                label="Confirm Password Here"
                type="password"
                fullWidth
                name="confirm-password"
                variant="standard"
                onChange={handleChange}
              />
              <ErrorMessage
                name="confirm-password"
                component="div"
                className="error"
              />

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                >
                  {isSubmitting ? <CircularProgress size={20} /> : "Sign Up"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}
