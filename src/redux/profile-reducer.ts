import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO';

type postsType = {
    text: string
}
type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
type photosType = {
    small: string | null
    large: string | null
}
type profileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: contactsType
    photos: photosType
}
let initialState = {
    posts: [
        { text: 'Hello!' },
        { text: 'Guys' },
        { text: 'Welcome to the' },
        { text: 'Club' },
        { text: 'Body!' },
    ] as Array<postsType>,
    newPostText: '' as string | null,
    profile: null as profileType | null,
    status: '' as string | null,
}

type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
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
            return { ...state, profile: {...state.profile, photos: action.photo } as profileType}
        }
        default: return state;
    }
}
type addPostActionCreatorType = {
    type: typeof ADD_POST, 
    newPost: string
}
export const addPostActionCreator = (newPost: string):addPostActionCreatorType => ({ type: ADD_POST, newPost })

type updateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT, 
    newText: string
}
export const updateNewPostTextActionCreator = (text:string):updateNewPostTextActionCreatorType => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

type setUserProfileType = {
    type: typeof SET_USER_PROFILE, 
    profile: object
}
export const setUserProfile = (profile: object): setUserProfileType => ({ type: SET_USER_PROFILE, profile })

type setUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): setUserStatusType => ({ type: SET_USER_STATUS, status })

type setProfilePhotoType = {
    type: typeof SET_PROFILE_PHOTO, 
    photo: string
}
export const setProfilePhoto = (photo: string): setProfilePhotoType => ({ type: SET_PROFILE_PHOTO, photo })


export const getUserData = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserData(userId);
    dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const updateProfilePhoto = (photo: string) => async (dispatch: any) => {
    let response = await profileAPI.updateProfilePhoto(photo);
    if (response.data.resultCode === 0) {
        debugger
        dispatch(setProfilePhoto(response.data.data.photos));
    }
}

export default profileReducer;