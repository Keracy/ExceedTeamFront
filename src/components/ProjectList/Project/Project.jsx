import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  project: {
    width: "80%",
    padding: "10px",
    border: "1px solid black",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
    },
  },
});
const Project = (props) => {
  const s = useStyles();
  const { title } = props;
  return <div className={s.project}>{title}</div>;
};

export default Project;
