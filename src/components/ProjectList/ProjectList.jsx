import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { addProject, getProjects } from "../redux/actions/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progress: {
    height: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ProjectsTable = (props) => {
  const s = useStyles();
  useEffect(() => {
    props.getProjects();
    if (props.projectsLoaded) {
      setState((prevValue) => ({ ...prevValue, data: props.projects }));
    }
  }, [props.projectsLoaded]);
  const [state, setState] = React.useState({
    columns: [
      { title: "Title", field: "title" },
      {
        title: "Status",
        field: "status",
        lookup: { 0: "Paused", 1: "In Progress", 2: "Done" },
      },
      {
        field: "devs",
        title: "Developers",
        render: (rowData) => (
          <div style={{ display: "flex" }}>
            {rowData.devs.map((dev) => (
              <Link to={`/${dev}`}>
                <Button>
                  <img
                    alt="avatar"
                    src={`https://robohash.org/${dev}?set=set5`}
                    style={{ width: 50, borderRadius: "50%" }}
                  />
                </Button>
              </Link>
            ))}
          </div>
        ),
      },
      {
        title: "Rate/h",
        field: "rate",
      },
    ],
  });

  return (
    <MaterialTable
      title="Our Projects"
      columns={state.columns}
      data={state.data}
      options={{ actionsColumnIndex: 5 }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                newData.devs = newData.devs.split(",");
                props.addProject(newData);
              });
            }, 500);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 500);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 500);
          }),
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    projectsLoaded: state.projectsLoaded,
  };
};
const mapDispatchToProps = {
  addProject,
  getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
