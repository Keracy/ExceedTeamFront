import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addEmployee } from "../../redux/actions/actions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  employee_block: {
    textAlign: "center",
  },
  employee_form: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  employee_input: {
    marginBottom: "10px",
  },
});

const AddEmployee = (props) => {
  const s = useStyles();
  const [newEmployee, setNewEmployee] = useState({});
  const changeHandler = (event) => {
    setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.addEmployee(newEmployee);
    props.handleClose();
  };
  return (
    <div className={s.employee_block}>
      <form
        component="form"
        className={s.employee_form}
        onSubmit={submitHandler}
      >
        <TextField
          className={s.employee_input}
          name="name"
          onChange={changeHandler}
          id="standard-basic"
          label="Name"
        />
        <TextField
          className={s.employee_input}
          name="phone"
          onChange={changeHandler}
          id="standard-basic"
          label="Phone"
        />
        <TextField
          className={s.employee_input}
          name="email"
          onChange={changeHandler}
          id="standard-basic"
          label="E-Mail"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Employee{" "}
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addEmployee,
};
const mapStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
