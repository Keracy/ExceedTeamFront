import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { Typography, Avatar, Button } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
const ProjectsTable = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

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
            {rowData.devs.map((id) => (
              <div>
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Link to={`/${id}`}>
                    <Button>
                      <img
                        alt="avatar"
                        src={`https://robohash.org/${id}?set=set5`}
                        style={{ width: 50, borderRadius: "50%" }}
                      />
                    </Button>
                  </Link>
                </Typography>
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>I use Popover.</Typography>
                </Popover>
              </div>
            ))}
          </div>
        ),
      },
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
