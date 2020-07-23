import React from "react";
import s from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/actions";

const Navbar = (props) => {
  const { isUserLogged } = props;
  return (
    <div className={s.header}>
      <Link className={s.nav_link} to="/">
        Employee List
      </Link>
      <Link className={s.nav_link} to="/projects">
        Projects
      </Link>
      {isUserLogged ? (
        <Link
          className={s.nav_link}
          onClick={() => {
            props.logOut();
          }}
        >
          Log out
        </Link>
      ) : (
        <Link className={s.nav_link} to="/auth">
          Log in
        </Link>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { users: state.users, isUserLogged: state.isUserLogged };
};
const mapDispatchToProps = {
  logOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
