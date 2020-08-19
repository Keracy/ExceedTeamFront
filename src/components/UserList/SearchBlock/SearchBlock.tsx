import React, { useState } from "react";
import AddEmployeeModal from "../Modal";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setSearchWord, searchEmployees } from "../../redux/actions/actions";
import { IconButton } from "@material-ui/core";
import { State } from "../../../types";
const useStyles = makeStyles({
  search_block: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
});

type Props = {
  searchEmployees: (value: string) => void;
};

const SearchBlock: React.FC<Props> = (props) => {
  const s = useStyles();
  const [searchTimeout, setSearchTimeout] = useState<number>();
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    clearTimeout(searchTimeout);
    setSearchTimeout(
      window.setTimeout(() => {
        props.searchEmployees(value);
      }, 500)
    );
  };

  return (
    <div className={s.search_block}>
      <TextField
        fullWidth={true}
        onChange={searchHandler}
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
      <IconButton>
        <AddEmployeeModal />
      </IconButton>
    </div>
  );
};
const mapDispatchToProps = {
  setSearchWord,
  searchEmployees,
};
const mapStateToProps = (state: State) => {
  return {
    searchWord: state.searchWord,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock);
