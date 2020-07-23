import React from "react";
import s from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
  return (
    <div className={s.header}>
      <Link className={s.nav_link} to="/">
        Employee List
      </Link>
      <Link className={s.nav_link} to="/projects">
        Projects
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapStateToProps)(Navbar);
