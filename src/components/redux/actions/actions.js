import {
  GET_USERS_BEGIN,
  GET_USERS_SUCCEED,
  GET_USERS_FAIL,
  SET_SEARCH_WORD,
  GET_USER_BEGIN,
  GET_USER_SUCCEED,
  GET_USER_FAIL,
  ADD_USER_BEGIN,
  ADD_USER_SUCCEED,
  ADD_USER_FAIL,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCEED,
  DELETE_USER_FAIL,
} from "../action-types";
import axios from "axios";
export const setSearchWord = (payload) => {
  return { type: SET_SEARCH_WORD, payload };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_USERS_BEGIN });
      const { data } = await axios.get("http://localhost:4002/users/");
      dispatch({ type: GET_USERS_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: GET_USERS_FAIL, err: err.message });
    }
  };
};
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_USER_BEGIN });
      const { data } = await axios.get(`http://localhost:4002/users/${id}`);
      dispatch({ type: GET_USER_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: GET_USER_FAIL, err: err.massage });
    }
  };
};
export const addEmployee = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_BEGIN });
      const { data } = await axios.post(
        "http://localhost:4002/users/",
        payload
      );
      console.log(data);
      dispatch({ type: ADD_USER_SUCCEED, payload: data });
    } catch (err) {
      dispatch({ type: ADD_USER_FAIL });
    }
  };
};
export const deleteEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_BEGIN });
      await axios.delete(`http://localhost:4002/users/${id}`);
      dispatch({ type: DELETE_USER_SUCCEED, id });
    } catch (err) {
      dispatch({ type: DELETE_USER_FAIL, err: err.message });
    }
  };
};
