import React, { useEffect, useState } from "react";
import MaterialTable, { MTableEditField } from "material-table";
import { connect } from "react-redux";
import { Button, Typography, Select, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  addProject,
  getProjects,
  deleteProject,
  editProject,
  getEmployees,
} from "../redux/actions/actions";
import Status from "./Status/Status";
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
  const { employees } = props;
  const [devsName, setDevsName] = useState([]);
  const s = useStyles();
  useEffect(() => {
    props.getProjects();
    props.getEmployees();
    if (props.projectsLoaded && !props.loading) {
      setTableState((prevValue) => ({ ...prevValue, data: props.projects }));
    }
  }, [props.projectsLoaded]);
  const [tableState, setTableState] = useState({
    columns: [
      { title: "Title", field: "title" },
      {
        title: "Status",
        field: "status",
        lookup: {
          0: <Status statusTitle="Paused" />,
          1: <Status statusTitle="In Progress" />,
          2: <Status statusTitle="Done" />,
        },
      },
      {
        field: "devs",
        title: "Developers",
        render: (rowData) => (
          <div style={{ display: "flex" }}>
            {rowData.devs.map((dev) => (
              <Link to={`/${dev}`} key={dev}>
                <Button>
                  <img
                    alt="avatar"
                    // src={`https://robohash.org/${dev}?set=set5`}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/1024px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg"
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
    <>
      <MaterialTable
        title="Our Projects"
        columns={tableState.columns}
        data={tableState.data}
        options={{ actionsColumnIndex: 5 }}
        components={{
          EditField: (props) => {
            // console.log(props);
            return props.columnDef.field === "devs" ? (
              <Select
                renderValue={(value) => {
                  return value.map((id) => (
                    <img
                      alt="avatar"
                      src={`https://robohash.org/${id}?set=set5`}
                      style={{ width: 50, borderRadius: "50%" }}
                    />
                  ));
                }}
                multiple
                value={props.rowData.devs ? [...props.rowData.devs] : []}
                onChange={(event) => {
                  const filteredDevs = event.target.value.filter((item) => {
                    if (!props.rowData.devs) {
                      props.rowData.devs = [];
                      props.rowData.devs.push(item);
                      return item;
                    }
                    if (!props.rowData.devs.some((item2) => item2 === item)) {
                      props.rowData.devs.push(item);
                      return item;
                    }
                  });
                  setDevsName(filteredDevs);
                }}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee._id} value={employee._id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        alt="avatar"
                        src={`https://robohash.org/${employee._id}?set=set5`}
                        style={{ width: 50, borderRadius: "50%" }}
                      />
                      <Typography>{employee.name}</Typography>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <MTableEditField {...props} />
            );
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();
              setTableState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                console.log(newData);
                props.addProject(newData);
                return { ...prevState, data: data };
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setTableState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    console.log(newData);
                    props.editProject(newData);
                    return { ...prevState, data };
                  });
                }
              }, 500);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setTableState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  props.deleteProject(oldData);
                  return { ...prevState, data };
                });
              }, 500);
            }),
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    projects: state.projects,
    projectsLoaded: state.projectsLoaded,
    loading: state.loading,
  };
};
const mapDispatchToProps = {
  addProject,
  getProjects,
  deleteProject,
  editProject,
  getEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
