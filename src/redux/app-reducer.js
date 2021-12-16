import { getLogin } from "./auth-reducer";

const SET_INITIALIZED = 'const SET_INITIALIZED = ';


let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return { ...state, initialized: true }
        }
        default: return state;
    }
}

export const setInitializedSuccess = () => ({ type: SET_INITIALIZED})
export const initialize = () => dispatch => {
    let promise = dispatch(getLogin())
    Promise.all([promise]).then(() => {
        dispatch(setInitializedSuccess());
    })
}
export default appReducer;