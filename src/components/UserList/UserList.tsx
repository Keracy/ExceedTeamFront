import React, { useEffect } from "react";
import User from "./User/User";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchBlock from "./SearchBlock/SearchBlock";
import { getEmployees } from "../redux/actions/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { State, UserType } from "../../types";

const useStyles = makeStyles({
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  user_block: {
    textAlign: "center",
    padding: "30px",
  },
});

type Props = {
  employees: UserType[];
  searchWord: string;
  loading: boolean;
  getEmployees: () => void;
};

const UserList: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.getEmployees();
  }, []);
  const s = useStyles();
  return (
    <div className={s.user_block}>
      <SearchBlock />
      {props.loading ? (
        <div className={s.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={5}>
          {props.employees.map((user) => (
            <Grid item lg={3} md={4} sm={6}>
              <User
                key={user._id}
                id={user._id}
                name={user.name}
                phone={user.phone}
                email={user.email}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
const mapStateToProps = (state: State) => {
  return {
    employees: state.employees,
    searchWord: state.searchWord,
    loading: state.loading,
  };
};
const mapDispatchToProps = {
  getEmployees,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
