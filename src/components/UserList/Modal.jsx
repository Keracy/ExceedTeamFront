import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddEmployee from "./AddEmployee/AddEmployee";
import { Typography, CardMedia } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  add_icon: {
    width: "40px",
    cursor: "pointer",
  },
}));

export default function AddEmployeeModal() {
  const s = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={s.paper}>
      <Typography variant="h5">New Employee</Typography>
      <AddEmployee handleClose={handleClose} />
    </div>
  );

  return (
    <div>
      <CardMedia
        onClick={handleOpen}
        component="img"
        image="https://image.flaticon.com/icons/png/512/104/104779.png"
        className={s.add_icon}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
