import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type :  actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    return {
        type :  actionTypes.AUTH_SUCCESS,
        token : token,
        userId : userId
    };
};

export const authFailure = (error) => {
    return {
        type :  actionTypes.AUTH_FAILURE,
        error : error
    };
};

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA1CQHyOqmkl5aRWVKyhOVWPXnJjn5lRzE';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA1CQHyOqmkl5aRWVKyhOVWPXnJjn5lRzE';
        }
        axios.post(url,authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
        })
        .catch(e1 => {
            console.log(e1.response);
            dispatch(authFailure(e1.response.data.error.message));
        });
    };
};