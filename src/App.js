import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import s from "./App.module.css";
import ProjectList from "./components/ProjectList/ProjectList";
import UserPage from "./components/UserPage/UserPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import { checkAuth } from "./components/redux/actions/actions";

function App(props) {
  const { isUserLogged, checkAuth } = props;
  useEffect(() => {
    if (
      localStorage.getItem("auth-token") &&
      localStorage.getItem("logged-user")
    ) {
      const token = localStorage.getItem("auth-token");
      const id = JSON.parse(localStorage.getItem("logged-user"));
      checkAuth(token, id);
    }
  }, [isUserLogged, localStorage]);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <PrivateRoute
            auth={isUserLogged}
            exact
            path="/"
            component={UserList}
          />
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/auth" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/:userId" component={UserPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    isUserLogged: state.isUserLogged,
  };
};
const mapDispatchToProps = {
  checkAuth,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
