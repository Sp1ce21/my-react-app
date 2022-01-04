import { profileAPI } from "../api/api";


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO';

let initialState = {
    posts: [
        { text: 'Hello!' },
        { text: 'Guys' },
        { text: 'Welcome to the' },
        { text: 'Club' },
        { text: 'Body!' },
    ],
    newPostText: '',
    profile: null,
    status: '',
    // photo: null,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, { text: action.newPost }]

            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }
        case SET_PROFILE_PHOTO: {
            return { ...state, profile: {...state.profile, photos: action.photo } }
        }
        default: return state;
    }
}

export const addPostActionCreator = (newPost) => ({ type: ADD_POST, newPost })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })
export const setProfilePhoto = (photo) => ({ type: SET_PROFILE_PHOTO, photo })

export const getUserData = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserData(userId);
    dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const updateProfilePhoto = (photo) => async (dispatch) => {
    let response = await profileAPI.updateProfilePhoto(photo);
    if (response.data.resultCode === 0) {
        debugger
        dispatch(setProfilePhoto(response.data.data.photos));
    }
}

export default profileReducer;