import React from "react";
import { connect } from "react-redux";
import Project from "./Project/Project";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  project_block: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

const ProjectList = (props) => {
  const s = useStyles();
  const { projects } = props;
  return (
    <div className={s.project_block}>
      {projects.map((project) => {
        return <Project title={project.name} />;
      })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

export default connect(mapStateToProps)(ProjectList);
