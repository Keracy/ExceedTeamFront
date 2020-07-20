import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
  userPage: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid blue",
  },
  pageBlock: {
    display: "flex",
    justifyContent: "center",
  },
});

const UserPage = (props) => {
  const { userId } = props.match.params;
  const s = useStyles();
  const { loadingUser, user } = props;
  console.log(user);
  useEffect(() => {
    props.getUser(userId);
  }, []);
  return (
    <div className={s.pageBlock}>
      {loadingUser ? (
        <div className={s.progress}>
          <CircularProgress />
        </div>
      ) : (
        <div className={s.userPage}>
          <img src={"https://robohash.org/" + user._id} alt="" />
          <div>
            <Typography>{user.name}</Typography>
            <Typography>{user.phone}</Typography>
            <Typography>{user.email}</Typography>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.currentUser,
  loadingUser: state.loading,
});
const mapDispatchToProps = {
  getUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
