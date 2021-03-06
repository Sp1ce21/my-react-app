import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import navbarReducer from './navbar-reducer';
import usersReducer from "./users-reducer";
import authReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    navbar: navbarReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;