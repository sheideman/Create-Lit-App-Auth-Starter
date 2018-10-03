export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const SIGNOUT_USER = 'SIGNOUT_USER'


export const signup = (formProps) => (dispatch )=>{
  const token = window.localStorage.getItem('jwtToken');
  return fetch(`/api/users/signup`, {
   method: "POST",
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(formProps)
 }).then(function(response) {
  return  response.json();
 })
 .then(function(data) {
   console.log(data);
   if(data && data.error){
    dispatch(authError(data.error));
   }
   if(data && data.token){
 
    window.localStorage.setItem("jwtToken", data.token);
     dispatch(authUser(data.token));
   return  window.dispatchEvent(
      new CustomEvent('vaadin-router-go', {detail: {pathname: '/users/me'}}));
   }

 })
 .catch(function(err){
   return dispatch(authError(err));
 });
};

export const signin = (formProps) => (dispatch) =>{
  const token = window.localStorage.getItem('jwtToken');
  return fetch(`/api/users/signin`, {
   method: "POST",
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(formProps)
 }).then(function(response) {

   return response.json();
 }).then(function(data) {
   console.log("data", data);
  
     dispatch(authUser(data.token));
     window.localStorage.setItem("jwtToken", data.token);
  window.dispatchEvent(
      new CustomEvent('vaadin-router-go', {detail: {pathname: '/users/me'}}));
      return;
 })
 .catch(function(err){
   console.log("error",err);
   return dispatch(authError(err))
 });
};
export const signout = () =>{
  window.localStorage.removeItem('jwtToken');
  window.dispatchEvent(
    new CustomEvent('vaadin-router-go', {detail: {pathname: '/signout'}}));
  return {
    type: AUTH_USER,
    token:""
  };
}
const authUser = (token) => {
 
  return {
    type: AUTH_USER,
    token
  };
};

const authError = (error) => {

  return {
    type: AUTH_ERROR,
    error
  };
};
export const fetchUserRequest = () =>(dispatch)=>  {
  const token = window.localStorage.getItem('jwtToken');
  dispatch(fetchUserBegin());
  return fetch(`/api/users/me`,{
    method: "GET",
    headers: {
      'Authorization': token 
    }
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log("data", data);
    dispatch(fetchUserSuccess(data));
  })
  .catch(function(err){
   return dispatch(fetchUserFailure(err));
  });
  };
  const fetchUserBegin = () => {

    return {
      type: FETCH_USER_BEGIN
    };
  };
  
  const fetchUserSuccess = (data) => {
    const token = window.localStorage.getItem('jwtToken');
    return {
      type: FETCH_USER_SUCCESS,
      data,
      token
    };
  };
  
  const fetchUserFailure = (error) => {
  
    return {
      type: FETCH_USER_FAILURE,
      error
    };
  };