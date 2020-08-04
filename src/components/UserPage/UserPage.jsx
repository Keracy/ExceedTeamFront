import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getEmployee, changeEmployee } from "../redux/actions/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
  userPage: {
    backgroundColor: "#f2ffff",
    margin: "40px",
    padding: "30px",
    height: "auto",
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid black",
    borderRadius: "5px",
    boxShadow: "3px 3px 10px black",
  },
  pageBlock: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    border: "1px solid black",
    borderRadius: "150px",
    backgroundColor: "#fff",
  },
  avatarBlock: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  description: {
    fontSize: "40px",
  },
  descriptionBlock: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  descriptionWrapper: {
    display: "flex",
    width: "100%",
  },
  changeIcon: {
    cursor: "pointer",
    height: "25px",
  },
  btnConfirm: {
    marginLeft: "15px",
    marginTop: "50px",
  },
  changeForm: {
    textAlign: "center",
  },
});

const UserPage = (props) => {
  const [change, setChange] = useState(false);
  const changeHandler = () => {
    setChange((prevValue) => {
      return !prevValue;
    });
  };
  const { userId } = props.match.params;
  const s = useStyles();
  const { loadingEmployee, user } = props;
  const [currentEmployee, setCurrentEmployee] = useState({});
  useEffect(() => {
    setCurrentEmployee({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  }, [user]);
  const inputChangeHandler = (event) => {
    event.persist();
    switch (event.target.name) {
      case "name":
        setCurrentEmployee((prevValue) => ({
          ...prevValue,
          name: event.target.value,
        }));
        break;
      case "phone":
        setCurrentEmployee((prevValue) => ({
          ...prevValue,
          phone: event.target.value,
        }));
        break;
      case "email":
        setCurrentEmployee((prevValue) => ({
          ...prevValue,
          email: event.target.value,
        }));
        break;
      default:
        break;
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.changeEmployee(user._id, currentEmployee);
    changeHandler();
  };
  useEffect(() => {
    props.getEmployee(userId);
  }, []);
  return (
    <div className={s.pageBlock}>
      {loadingEmployee ? (
        <div className={s.progress}>
          <CircularProgress />
        </div>
      ) : (
        <div className={s.userPage}>
          <div className={s.avatarBlock}>
            <img
              className={s.avatar}
              // src={`https://robohash.org/${user._id}?set=set5`}
              width="300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/1024px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg"
              alt=""
            />
          </div>
          <div className={s.descriptionWrapper}>
            <div className={s.descriptionBlock}>
              {change ? (
                <form
                  onSubmit={submitHandler}
                  component="form"
                  className={s.changeForm}
                >
                  <div>
                    <Typography>Name:</Typography>
                    <TextField
                      name="name"
                      onChange={inputChangeHandler}
                      defaultValue={user.name}
                    />
                  </div>
                  <div>
                    <Typography>Phone:</Typography>
                    <TextField
                      name="phone"
                      onChange={inputChangeHandler}
                      defaultValue={user.phone}
                    />
                  </div>
                  <div>
                    <Typography>E-Mail:</Typography>
                    <TextField
                      name="email"
                      onChange={inputChangeHandler}
                      defaultValue={user.email}
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={s.btnConfirm}
                    >
                      Confirm
                    </Button>
                    <Button
                      color="default"
                      variant="outlined"
                      className={s.btnConfirm}
                      onClick={changeHandler}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <Typography>Name:</Typography>
                    <Typography className={s.description}>
                      {user.name}
                    </Typography>
                  </div>
                  <div>
                    <Typography>Phone:</Typography>
                    <Typography className={s.description}>
                      {user.phone}
                    </Typography>
                  </div>
                  <div>
                    <Typography>E-Mail:</Typography>
                    <Typography className={s.description}>
                      {user.email}
                    </Typography>
                  </div>
                  {props.validationError ? (
                    <div>
                      <Typography color="error">Validation Error</Typography>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <div className={s.changeIcon} onClick={changeHandler}>
              <img
                src="https://image.flaticon.com/icons/png/512/61/61456.png"
                width="20"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.currentEmployee,
  loadingEmployee: state.loading,
});
const mapDispatchToProps = {
  getEmployee,
  changeEmployee,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
