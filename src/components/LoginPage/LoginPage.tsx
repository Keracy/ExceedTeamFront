import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/actions";
import { State } from "../../types";

const useStyles = makeStyles({
  loginBlock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
  },
  formBlock: {
    display: "flex",
    padding: "30px",
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
});
type UserType = {
  username: string;
  password: string;
};
type Props = {
  loginUser: (user: UserType) => object;
  isUserLogged: boolean;
};
const LoginPage: React.FC<Props> = (props: Props) => {
  const { loginUser, isUserLogged } = props;
  const s = useStyles();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(user);
  };
  return isUserLogged ? (
    <Redirect from="/auth" to="/" />
  ) : (
    <div className={s.loginBlock}>
      <form className={s.formBlock} onSubmit={submitHandler}>
        <TextField
          className={s.inputField}
          onChange={changeHandler}
          name="username"
          placeholder="Username"
          variant="outlined"
        />
        <TextField
          className={s.inputField}
          onChange={changeHandler}
          name="password"
          type="password"
          placeholder="Password"
          variant="outlined"
        />
        <Typography>
          Do not have any account yet?{" "}
          <Link className={s.link} to="/register">
            Register
          </Link>
          !
        </Typography>
        <Button
          className={s.loginBtn}
          type="submit"
          variant="contained"
          color="primary"
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser,
};
const mapStateToProps = (state: State) => {
  return { isUserLogged: state.isUserLogged };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
