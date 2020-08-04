import {
  CHECK_AUTH_BEGIN,
  CHECK_AUTH_SUCCEED,
  CHECK_AUTH_FAIL,
  GET_EMPLOYEES_BEGIN,
  GET_EMPLOYEES_SUCCEED,
  GET_EMPLOYEES_FAIL,
  SET_SEARCH_WORD,
  GET_EMPLOYEE_BEGIN,
  GET_EMPLOYEE_SUCCEED,
  GET_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_BEGIN,
  ADD_EMPLOYEE_SUCCEED,
  ADD_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_BEGIN,
  DELETE_EMPLOYEE_SUCCEED,
  DELETE_EMPLOYEE_FAIL,
  CHANGE_EMPLOYEE_BEGIN,
  CHANGE_EMPLOYEE_SUCCEED,
  CHANGE_EMPLOYEE_FAIL,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCEED,
  REGISTER_USER_FAIL,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCEED,
  LOGIN_USER_FAIL,
  LOG_OUT,
  SEARCH_EMPLOYEES_BEGIN,
  SEARCH_EMPLOYEES_SUCCEED,
  SEARCH_EMPLOYEES_FAIL,
  ADD_PROJECT_BEGIN,
  ADD_PROJECT_SUCCEED,
  ADD_PROJECT_FAIL,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCEED,
  GET_PROJECTS_FAIL,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_SUCCEED,
  DELETE_PROJECT_FAIL,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCEED,
  EDIT_PROJECT_FAIL,
} from "../action-types";
import axios from "axios";
export const setSearchWord = (payload) => {
  return { type: SET_SEARCH_WORD, payload };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CHECK_AUTH_BEGIN });
      const payload = {
        token: localStorage.getItem("auth-token"),
        id: JSON.parse(localStorage.getItem("logged-user"))._id,
      };
      const { data } = await axios.post(
        `http://localhost:${process.env.REACT_APP_PORT}/users/logged`,
        payload
      );
      dispatch({ type: CHECK_AUTH_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: CHECK_AUTH_FAIL, err_msg: err });
    }
  };
};

export const registerUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_BEGIN });
      const { data } = await axios.post(
        `http://localhost:${process.env.REACT_APP_PORT}/users/register`,
        payload
      );
      const registerEmailExist = data === "email exist" ? true : false;
      dispatch({
        type: REGISTER_USER_SUCCEED,
        payload,
        registerEmailExist: registerEmailExist,
      });
    } catch (err) {
      dispatch({ type: REGISTER_USER_FAIL, err_msg: err });
    }
  };
};

export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const { data } = await axios.post(
        `http://localhost:${process.env.REACT_APP_PORT}/users/login`,
        payload
      );
      dispatch({ type: LOGIN_USER_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: LOGIN_USER_FAIL, err_msg: err.message });
    }
  };
};

export const searchEmployees = (searchWord) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEARCH_EMPLOYEES_BEGIN });
      const {
        data,
      } = await axios.post(
        `http://localhost:${process.env.REACT_APP_PORT}/employees/search`,
        { searchWord: searchWord }
      );
      dispatch({ type: SEARCH_EMPLOYEES_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: SEARCH_EMPLOYEES_FAIL, err_msg: err.message });
    }
  };
};

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_EMPLOYEES_BEGIN });
      const { data } = await axios.get(
        `http://localhost:${process.env.REACT_APP_PORT}/employees/`
      );
      dispatch({ type: GET_EMPLOYEES_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: GET_EMPLOYEES_FAIL, err: err.message });
    }
  };
};
export const getEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_EMPLOYEE_BEGIN });
      const { data } = await axios.get(
        `http://localhost:${process.env.REACT_APP_PORT}/employees/${id}`
      );
      dispatch({ type: GET_EMPLOYEE_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: GET_EMPLOYEE_FAIL, err: err.massage });
    }
  };
};
export const addEmployee = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_EMPLOYEE_BEGIN });
      const { data } = await axios.post(
        `http://localhost:${process.env.REACT_APP_PORT}/employees/`,
        payload
      );
      console.log(data);
      dispatch({ type: ADD_EMPLOYEE_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: ADD_EMPLOYEE_FAIL });
    }
  };
};
export const deleteEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_EMPLOYEE_BEGIN });
      await axios.delete(
        `http://localhost:${process.env.REACT_APP_PORT}/employees/${id}`
      );
      dispatch({ type: DELETE_EMPLOYEE_SUCCEED, id });
    } catch (err) {
      dispatch({ type: DELETE_EMPLOYEE_FAIL, err: err.message });
    }
  };
};
export const changeEmployee = (id, payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CHANGE_EMPLOYEE_BEGIN });
      const changedEmployee = await axios.patch(
        `http://localhost:${process.env.REACT_APP_PORT}/employees/${id}`,
        payload
      );
      dispatch({
        type: CHANGE_EMPLOYEE_SUCCEED,
        payload: changedEmployee.data,
      });
      return "Done";
    } catch (err) {
      dispatch({ type: CHANGE_EMPLOYEE_FAIL, err: err.message });
    }
  };
};

export const logOut = () => {
  return { type: LOG_OUT };
};

export const addProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_PROJECT_BEGIN });
      const { data } = await axios.post(
        `http://localhost:${process.env.REACT_APP_PORT}/projects`,
        payload
      );
      dispatch({ type: ADD_PROJECT_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: ADD_PROJECT_FAIL, err_msg: err });
    }
  };
};

export const getProjects = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PROJECTS_BEGIN });
      const { data } = await axios.get(
        `http://localhost:${process.env.REACT_APP_PORT}/projects`
      );
      dispatch({ type: GET_PROJECTS_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: GET_PROJECTS_FAIL, err_msg: err });
    }
  };
};

export const deleteProject = (project) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_PROJECT_BEGIN });
      await axios.delete(
        `http://localhost:${process.env.REACT_APP_PORT}/projects`,
        { data: project }
      );
      dispatch({ type: DELETE_PROJECT_SUCCEED, payload: project });
    } catch (err) {
      dispatch({ type: DELETE_PROJECT_FAIL, err_msg: err });
    }
  };
};

export const editProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EDIT_PROJECT_BEGIN });
      const { data } = await axios.patch(
        `http://localhost:${process.env.REACT_APP_PORT}/projects`,
        payload
      );
      dispatch({ type: EDIT_PROJECT_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: EDIT_PROJECT_FAIL, err_msg: err });
    }
  };
};
