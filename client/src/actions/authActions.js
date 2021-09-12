import axios from 'axios';
// import { application } from 'express';
import { returnErrors } from './errorActions';
import {
   USER_LOADED,
   USER_LOADING,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT_SUCCESS,
   REGISTER_SUCCESS,
   REGISTER_FAIL,
} from './types';

// Check Token and load user
export const loadUser = () => (dispatch, getState) => {
   // User Loading
   dispatch({ type: USER_LOADING });

   axios
      .get('/api/auth/user', tokenConfig(getState))
      .then((res) =>
         dispatch({
            type: USER_LOADED,
            payload: res.data,
         })
      )
      .catch((err) => {
         dispatch(returnErrors(err.response.data, err.response.status));
         dispatch({
            type: AUTH_ERROR,
         });
      });
};

// Register User
export const register =
   ({ name, email, password }) =>
   (dispatch) => {
      // Header
      const config = {
         headers: {
            'Content-type': 'application/json',
         },
      };

      // Request Body
      const body = JSON.stringify({ name, email, password });

      axios
         .post('/api/users', body, config)
         .then((res) =>
            dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data,
            })
         )
         .catch((err) => {
            dispatch(
               returnErrors(
                  err.response.data,
                  err.response.status,
                  'REGISTER_FAIL'
               )
            );
            dispatch({
               type: REGISTER_FAIL,
            });
         });
   };

export const logout = () => {
   return {
      type: LOGOUT_SUCCESS,
   };
};

// Setup Config and Header
export const tokenConfig = (getState) => {
   // Get Token from local storage
   const token = getState().auth.token;

   // Header
   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   // If Token then add to header
   if (token) {
      config.header['x-auth-token'] = token;
   }

   return config;
};
