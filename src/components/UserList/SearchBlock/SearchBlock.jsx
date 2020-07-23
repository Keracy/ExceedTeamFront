import React from "react";
import AddEmployeeModal from "../Modal";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setSearchWord } from "../../redux/actions/actions";
const useStyles = makeStyles({
  search_block: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
});

const SearchBlock = (props) => {
  const { setSearchWord } = props;
  const s = useStyles();
  const searchHandler = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <div className={s.search_block}>
      <TextField
        className={s.search_input}
        fullWidth={true}
        onChange={searchHandler}
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
      <AddEmployeeModal className={s.add_employee} />
    </div>
  );
};
const mapDispatchToProps = {
  setSearchWord,
};

export default connect(null, mapDispatchToProps)(SearchBlock);
