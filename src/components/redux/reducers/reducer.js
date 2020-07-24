import {
  CHECK_AUTH_BEGIN,
  CHECK_AUTH_SUCCEED,
  CHECK_AUTH_FAIL,
  ADD_EMPLOYEE,
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
} from "../action-types";

const initialState = {
  users: [],
  projects: [
    {
      title: "CRM-System",
      status: 2,
      rate: "25$",
      devs: ["5f199aac9da0564406a795ba", "5f16fd345d3fa22d8eeb7eed"],
      id: 0,
    },
    {
      title: "Podcast Platform",
      status: 1,
      rate: "65$",
      devs: [
        "5f1ae8bca62b7a09b25e012b",
        "5f1ae8f6a62b7a09b25e012c",
        "5f1ae966a62b7a09b25e012e",
      ],
      id: 1,
    },
    {
      title: "Social Network 'Kartana'",
      status: 0,
      rate: "15$",
      devs: [
        "5f1ae860a62b7a09b25e0129",
        "5f1ae887a62b7a09b25e012a",
        "5f1ae934a62b7a09b25e012d",
      ],
      id: 2,
    },
  ],
  loaderActive: false,
  err_msg: "",
  searchWord: "",
  loading: false,
  currentEmployee: {},
  registerEmailExist: null,
  loggedUser: null,
  isUserLogged: false,
  isTokenCompared: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH_BEGIN:
      return { ...state, loading: true, isTokenCompared: false };
    case CHECK_AUTH_SUCCEED:
      return {
        ...state,
        isUserLogged: Boolean(action.payload),
        isTokenCompared: true,
      };
    case CHECK_AUTH_FAIL:
      return { ...state, err_msg: action.err_msg, isTokenCompared: true };
    case SET_SEARCH_WORD:
      return { ...state, searchWord: action.payload };
    case ADD_EMPLOYEE:
      return { ...state, users: [...state.users, action.payload] };
    case GET_EMPLOYEES_BEGIN:
      return { ...state, loading: true };
    case GET_EMPLOYEES_SUCCEED:
      return { ...state, loading: false, users: action.payload };
    case GET_EMPLOYEES_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case GET_EMPLOYEE_BEGIN:
      return { ...state, loading: true };
    case GET_EMPLOYEE_SUCCEED:
      return {
        ...state,
        loading: false,
        currentEmployee: action.payload,
      };
    case GET_EMPLOYEE_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case ADD_EMPLOYEE_BEGIN:
      return { ...state, loading: true };
    case ADD_EMPLOYEE_SUCCEED:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case ADD_EMPLOYEE_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case DELETE_EMPLOYEE_BEGIN:
      return { ...state, loading: true };
    case DELETE_EMPLOYEE_SUCCEED:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.id),
      };
    case DELETE_EMPLOYEE_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case CHANGE_EMPLOYEE_BEGIN:
      return { ...state, loading: true };
    case CHANGE_EMPLOYEE_SUCCEED:
      if (action.payload.validationError) {
        return {
          ...state,
          loading: false,
        };
      } else {
        return {
          ...state,
          loading: false,
          currentEmployee: action.payload,
        };
      }
    case CHANGE_EMPLOYEE_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case REGISTER_USER_BEGIN:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCEED:
      return {
        ...state,
        loading: false,
        registerEmailExist: action.registerEmailExist,
      };
    case REGISTER_USER_FAIL:
      return { ...state, loading: false, err_msg: action.err_msg };
    case LOGIN_USER_BEGIN:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCEED:
      let logged = false;
      if (!(action.payload === "auth failed")) {
        localStorage.setItem("auth-token", action.payload.authToken);
        localStorage.setItem("logged-user", JSON.stringify(action.payload));
        logged = true;
      }
      return {
        ...state,
        loading: false,
        loggedUser: action.payload,
        isUserLogged: logged,
      };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: action.err_msg };
    case LOG_OUT:
      localStorage.clear();
      return { ...state, isUserLogged: false };
    case SEARCH_EMPLOYEES_BEGIN:
      return { ...state, loading: true };
    case SEARCH_EMPLOYEES_SUCCEED:
      return { ...state, loading: false, users: action.payload };
    case SEARCH_EMPLOYEES_FAIL:
      return { ...state, loading: false, err_msg: action.err_msg };

    default:
      return state;
  }
};
