import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import DeleteEmployeeModal from "./Dialog/Dialog";

const useStyles = makeStyles({
  more_icon: {
    cursor: "pointer",
  },
});

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const s = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <img
        onClick={handleClick}
        src="https://image.flaticon.com/icons/png/512/64/64576.png"
        alt="more"
        width="20"
        className={s.more_icon}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <DeleteEmployeeModal id={props.id} />
        </MenuItem>
      </Menu>
    </div>
  );
}
