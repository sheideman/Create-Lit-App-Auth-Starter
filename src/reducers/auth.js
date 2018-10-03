import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
  } from '../actions/auth';
  
  const INITIAL_STATE = {
    authenticated:"",
    errorMessage:"",
    user:{}
  };
  
  export default function auth(state = INITIAL_STATE, action) {
    switch(action.type) {
      case FETCH_USER_SUCCESS:
      return{
        ...state,
        user:action.data,
        authenticated:action.token
      }
      case FETCH_USER_FAILURE:
      return{
        ...state,
        errorMessage: action.error.error
      }
      case AUTH_USER:
        return {
          ...state,
          authenticated: action.token
        };
        case AUTH_ERROR:
        return {
          ...state,
          errorMessage: action.error.error
        };
        
    default:
      return state;
    }
  }