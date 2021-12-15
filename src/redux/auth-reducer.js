import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const LOGIN = 'LOGIN';
const UNLOGIN = 'UNLOGIN';
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.data, isAuth: true }
        }
        case LOGIN: {
            return { ...state, ...action.data, isAuth: true }
        }
        case UNLOGIN: {
            return { ...state, ...action.data, isAuth: false }
        }
        default: return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: {userId, email, login }})
export const setLogin = (email,password,rememberMe) => ({ type: LOGIN, data: {email,password,rememberMe}})
export const setUnLogin = (email,password,rememberMe) => ({ type: UNLOGIN, data: {email,password,rememberMe}})


export const getLogin = () => {
    return (dispatch) => {
        authAPI.getLogin().then(data => {
            if (data.resultCode == 0) {
                let {id,email,login} = data.data;
                    dispatch(setAuthUserData(id,email,login));
            }
        });
    }
}


export const login = () => {
    return (dispatch) => {
        authAPI.login().then(data => {
            if (data.resultCode == 0) {
                let {email,password,rememberMe} = data.data;
                    dispatch(setLogin(email,password,rememberMe));
            }
        });
    }
}


export const unLogin = () => {
    return (dispatch) => {
        authAPI.unLogin().then(data => {
            if (data.resultCode == 0) {
                let {email,password,rememberMe} = data.data;
                    dispatch(setUnLogin(email,password,rememberMe));
            }
        });
    }
}

export default authReducer;