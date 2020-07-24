import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
const ProjectsTable = (props) => {
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
        title: "Avatar",
        render: (rowData) => (
          <img
            alt="avatar"
            src={rowData.url}
            style={{ width: "50px", borderRadius: "50%" }}
          />
        ),
      },
      { title: "Developers", field: "devs" },
      {
        title: "Rate/h",
        field: "rate",
      },
    ],
    data: props.projects,
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
                return { ...prevState, data };
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
  };
};

export default connect(mapStateToProps)(ProjectsTable);
