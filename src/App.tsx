import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import s from "./App.module.css";
import ProjectList from "./components/ProjectList/ProjectList";
import UserPage from "./components/UserPage/UserPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import { checkAuth } from "./components/redux/actions/actions";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { State } from "./types";
console.log(s);
const useStyles = makeStyles({
  progress: {
    height: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

type Props = {
  isUserLogged: boolean;
  checkAuth: (token: string | null, id: string) => object;
  isTokenCompared: boolean;
};

function App(props: Props) {
  const s = useStyles();
  const { isUserLogged, checkAuth, isTokenCompared } = props;
  useEffect(() => {
    if (
      localStorage.getItem("auth-token") &&
      localStorage.getItem("logged-user")
    ) {
      const token = localStorage.getItem("auth-token");
      const id = JSON.parse(localStorage.getItem("logged-user") || "");
      checkAuth(token, id);
    } else {
      checkAuth("", "");
    }
  }, [isUserLogged, checkAuth]);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {isTokenCompared ? (
          <Switch>
            <PrivateRoute
              auth={isUserLogged}
              exact
              path="/"
              component={UserList}
            />
            <PrivateRoute
              auth={isUserLogged}
              exact
              path="/projects"
              component={ProjectList}
            />
            <Route exact path="/auth" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <PrivateRoute
              auth={isUserLogged}
              path="/:userId"
              component={UserPage}
            />
          </Switch>
        ) : (
          <div className={s.progress}>
            <CircularProgress />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state: State) => {
  return {
    isUserLogged: state.isUserLogged,
    isTokenCompared: state.isTokenCompared,
  };
};
const mapDispatchToProps = {
  checkAuth,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
