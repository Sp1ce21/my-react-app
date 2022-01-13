import { getLogin } from "./auth-reducer";

const SET_INITIALIZED = 'const SET_INITIALIZED = ';

type initialStateType = {
    initialized: boolean,
}

let initialState: initialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return { ...state, initialized: true }
        }
        default: return state;
    }
}

type setInitializedSuccessType = {
    type: typeof SET_INITIALIZED
}

export const setInitializedSuccess = (): setInitializedSuccessType => ({ type: SET_INITIALIZED})
export const initialize = () => (dispatch: any) => {
    let promise = dispatch(getLogin())
    Promise.all([promise]).then(() => {
        dispatch(setInitializedSuccess());
    })
}
export default appReducer;