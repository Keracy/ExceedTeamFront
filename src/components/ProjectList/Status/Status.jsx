import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

const useStyles = makeStyles({
  status: {
    width: "120px",
    textAlign: "center",
    padding: "10px",
    borderRadius: "30px",
  },
  done: { backgroundColor: "#33FF66" },
  paused: { backgroundColor: "#CCCCCC	" },
  progress: { backgroundColor: "#00CCFF" },
});

const Status = (props) => {
  const s = useStyles();
  const statusClasses = classNames(s.status, {
    [s.done]: props.statusTitle === "Done",
    [s.paused]: props.statusTitle === "Paused",
    [s.progress]: props.statusTitle === "In Progress",
  });
  return (
    <div className={statusClasses}>
      <Typography>{props.statusTitle}</Typography>
    </div>
  );
};

export default Status;