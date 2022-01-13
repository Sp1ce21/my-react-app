import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

type initialStateType = typeof initialState


const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA:
             {
                return { ...state, ...action.payload }
            }

        default: return state;
    }
}


type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: { userId: number | null, email: string | null, login: string | null, isAuth: boolean } 
}
export const setAuthUserData = (userId: number | null, 
                                email: string | null, 
                                login: string | null, 
                                isAuth: boolean): setAuthUserDataType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

type setCaptchaUrlType = {
    type: typeof SET_CAPTCHA, payload: {captchaUrl: string | null}
}
export const setCaptchaUrl = (captchaUrl: string | null): setCaptchaUrlType => ({ type: SET_CAPTCHA, payload: {captchaUrl} })


export const getLogin = () => async (dispatch: any) => {
    let response = await authAPI.getLogin();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (  email: string | null, 
                        password: string | null, 
                        rememberMe: boolean, 
                        captcha: string | null) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getLogin());
    }
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages : "Some error"
        dispatch(stopSubmit("login", { _error: message }));
    }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.data.url))
};


export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;