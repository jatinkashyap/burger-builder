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

export const logout = (logoutTime) => {
    console.log("logout time");
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        },logoutTime*1000);
    };
};

export const authLogout = () => {
    console.log("logout");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type : actionTypes.AUTH_LOGOUT
    };
};

export const authCheckLoggedIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === null){
            dispatch(authLogout());
        }else{
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(new Date() > expirationDate){
                dispatch(authLogout());
            }else{
                dispatch(authSuccess(localStorage.getItem('token'),localStorage.getItem('userId')));
            }
        }
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
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('expirationDate',expirationDate); 
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(logout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response);
            dispatch(authFailure(err.response.data.error.message));
        });
    };
};