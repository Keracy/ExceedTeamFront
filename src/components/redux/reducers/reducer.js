import {
  ADD_EMPLOYEE,
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

const initialState = {
  users: [],
  projects: [
    {
      name: "CRM-System",
      id: 0,
    },
    {
      name: "Podcast Platform",
      id: 1,
    },
    {
      name: "Social Network 'Kartana'",
      id: 2,
    },
  ],
  loaderActive: false,
  err_msg: "",
  searchWord: "",
  loading: false,
  currentUser: {},
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_WORD:
      return { ...state, searchWord: action.payload };
    case ADD_EMPLOYEE:
      return { ...state, users: [...state.users, action.payload] };
    case GET_USERS_BEGIN:
      return { ...state, loading: true };
    case GET_USERS_SUCCEED:
      return { ...state, loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case GET_USER_BEGIN:
      return { ...state, loading: true };
    case GET_USER_SUCCEED:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case GET_USER_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case ADD_USER_BEGIN:
      return { ...state, loading: true };
    case ADD_USER_SUCCEED:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case ADD_USER_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case DELETE_USER_BEGIN:
      return { ...state, loading: true };
    case DELETE_USER_SUCCEED:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.id),
      };
    case DELETE_USER_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    default:
      return state;
  }
};
