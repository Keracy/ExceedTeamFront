import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import * as yup from "yup";
import { State } from "../../types";

const useStyles = makeStyles({
  registerBlock: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
  },
  formBlock: {
    display: "flex",
    padding: "30px",
    width: "450px",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#f2ffff",
  },
  inputField: {
    backgroundColor: "#fff",
    marginBottom: "20px",
  },
  loginBtn: {
    marginTop: "20px",
  },
  link: {
    color: "#3583d2",
  },
  errorMessage: {
    marginTop: "-20px",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("First name is required field."),
  email: yup
    .string()
    .email("Please enter email address in format: yourname@example.com")
    .required("Please enter email address in format: yourname@example.com"),
  phone: yup.string().required("Phone is required field."),
  password: yup
    .string()
    .min(6, "Password should be more then 5 letters")
    .required("Password is required field."),
});

type RegisterUser = {
  username: string;
  password: string;
  phone: string;
  email: string;
};
type Props = {
  registerUser: (user: RegisterUser) => void;
  registerEmailExist: boolean | null;
};
type ValidationObj = {
  username: string;
  password: string;
  phone: string;
  email: string;
};
type ValidationItem = {
  errors: string[];
  message: string;
  path: "password" | "email" | "username" | "phone";
  [key: string]: any;
};

const RegisterPage: React.FC<Props> = (props: Props) => {
  const { registerUser, registerEmailExist } = props;
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      validationSchema.validateSync({ ...user }, { abortEarly: false });
      registerUser(user);
    } catch (err) {
      const getErrorFields = () =>
        err.inner.reduce((obj: ValidationObj, item: ValidationItem) => {
          obj[item.path] = item.message;
          return obj;
        }, {});
      const errorFields = getErrorFields();
      setErrors(errorFields);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const s = useStyles();
  return (
    <div className={s.registerBlock}>
      <form onSubmit={submitHandler} className={s.formBlock}>
        <TextField
          error={Boolean(errors.username)}
          helperText={errors.username}
          name="username"
          onChange={handleInputChange}
          className={s.inputField}
          placeholder="Username"
          variant="outlined"
          value={user.username}
        />
        <TextField
          error={Boolean(errors.password)}
          helperText={errors.password}
          name="password"
          onChange={handleInputChange}
          className={s.inputField}
          placeholder="Password"
          type="password"
          variant="outlined"
          value={user.password}
        />
        <TextField
          error={Boolean(errors.email)}
          helperText={errors.email}
          type="email"
          name="email"
          onChange={handleInputChange}
          className={s.inputField}
          placeholder="E-Mail"
          variant="outlined"
          value={user.email}
        />
        {registerEmailExist ? (
          <Typography className={s.errorMessage} color="error">
            E-Mail already exist
          </Typography>
        ) : (
          <></>
        )}
        <TextField
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          name="phone"
          onChange={handleInputChange}
          className={s.inputField}
          placeholder="Phone"
          variant="outlined"
          value={user.phone}
        />
        <Typography>
          Already have an account?{" "}
          <Link className={s.link} to="/auth">
            Log in!
          </Link>
        </Typography>
        <Button
          type="submit"
          className={s.loginBtn}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </div>
  );
};
const mapDispatchToProps = {
  registerUser,
};
const mapStateToProps = (state: State) => {
  return {
    registerEmailExist: state.registerEmailExist,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
