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
  ADD_PROJECT_BEGIN,
  ADD_PROJECT_FAIL,
  ADD_PROJECT_SUCCEED,
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
import { UserType, ProjectType, DispatchType } from "../../../types";

const initialState = {
  employees: [],
  projects: [],
  err_msg: "",
  searchWord: "",
  loading: false,
  projectsLoaded: false,
  currentEmployee: {},
  registerEmailExist: null,
  loggedUser: null,
  isUserLogged: false,
  isTokenCompared: false,
};

export const rootReducer = (state = initialState, action: DispatchType) => {
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
      return { ...state, employees: [...state.employees, action.payload] };
    case GET_EMPLOYEES_BEGIN:
      return { ...state, loading: true };
    case GET_EMPLOYEES_SUCCEED:
      return { ...state, loading: false, employees: action.payload };
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
        employees: [...state.employees, action.payload],
      };
    case ADD_EMPLOYEE_FAIL:
      return { ...state, loading: false, err_msg: action.err };
    case DELETE_EMPLOYEE_BEGIN:
      return { ...state, loading: true };
    case DELETE_EMPLOYEE_SUCCEED:
      return {
        ...state,
        loading: false,
        employees: state.employees.filter(
          (user: UserType) => user._id !== action.id
        ),
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
      return { ...state, loading: false, err_msg: action.err_msg };
    case LOG_OUT:
      localStorage.clear();
      return { ...state, isUserLogged: false };
    case SEARCH_EMPLOYEES_BEGIN:
      return { ...state, loading: true };
    case SEARCH_EMPLOYEES_SUCCEED:
      return { ...state, loading: false, users: action.payload };
    case SEARCH_EMPLOYEES_FAIL:
      return { ...state, loading: false, err_msg: action.err_msg };
    case ADD_PROJECT_BEGIN:
      return { ...state, loading: true };
    case ADD_PROJECT_SUCCEED:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.payload],
      };
    case ADD_PROJECT_FAIL:
      return { ...state, loading: false, err_msg: action.err_msg };
    case GET_PROJECTS_BEGIN:
      return { ...state, loading: true };
    case GET_PROJECTS_SUCCEED:
      return {
        ...state,
        loading: false,
        projectsLoaded: true,
        projects: action.payload,
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        loading: false,
        projectsLoaded: true,
        err_msg: action.err_msg,
      };
    case DELETE_PROJECT_BEGIN:
      return { ...state };
    case DELETE_PROJECT_SUCCEED:
      return {
        ...state,
        projects: state.projects.filter(
          (project: ProjectType) => project._id !== action.payload._id
        ),
      };
    case DELETE_PROJECT_FAIL:
      return { ...state, err_msg: action.err_msg };
    case EDIT_PROJECT_BEGIN:
      return { ...state };
    case EDIT_PROJECT_SUCCEED:
      return {
        ...state,
        projects: state.projects.map((project: ProjectType) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case EDIT_PROJECT_FAIL:
      return { ...state, err_msg: action.err_msg };
    default:
      return state;
  }
};
