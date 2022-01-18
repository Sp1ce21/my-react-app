import { appStateType } from './store';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { usersType } from "../types/types";
import { photosType } from "../types/types";
import { itemsType } from "../types/types";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET__CURRENT__PAGE = 'SET__CURRENT__PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING = 'TOGGLE_FOLLOWING';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_PORTION = 'UPDATE_PORTION';

let initialState = {
    users: [] as Array<any>,
    pageSize: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    isFollowing: [] as Array<number>,
    uId: null as number | null,
    currentPortion: 1 as number,
};

type initialStateType = typeof initialState;

type actionsTypes = followType | unfollowType | setUsersType | setCurrentPageType | setTotalUsersCountType | toggleIsFetchingType | toggleFollowingType | updateUserType | clearUIdType | updateCurrentPortionType

const usersReducer = (state = initialState, action: actionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
            // !!!!!!!!!!!!! users: [...state.users, ...action.users]
        }
        case SET__CURRENT__PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_FOLLOWING: {
            return {
                ...state,
                isFollowing:
                    action.isFetching
                        ? [...state.isFollowing, action.userId]
                        : state.isFollowing.filter(id => id !== action.userId)
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                uId: action.uId
            }
        }
        case UPDATE_PORTION: {
            return {
                ...state,
                currentPortion: action.currentPortion
            }
        }
        default: return state;
    }
}



type followType = {
    type: typeof FOLLOW,
    userId: number
}
export const follow = (userId: number): followType => ({ type: FOLLOW, userId });

type unfollowType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollow = (userId: number): unfollowType => ({ type: UNFOLLOW, userId });

type setUsersType = {
    type: typeof SET_USERS,
    users: Array<usersType>
}
export const setUsers = (users: Array<usersType>): setUsersType => ({ type: SET_USERS, users });

type setCurrentPageType = {
    type: typeof SET__CURRENT__PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET__CURRENT__PAGE, currentPage });

type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });

type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type toggleFollowingType = {
    type: typeof TOGGLE_FOLLOWING,
    isFetching: boolean
    userId: number
}
export const toggleFollowing = (isFetching: boolean, userId: number): toggleFollowingType => ({ type: TOGGLE_FOLLOWING, isFetching, userId });

type updateUserType = {
    type: typeof UPDATE_USER,
    uId: number
}
export const updateUser = (uId: number): updateUserType => ({ type: UPDATE_USER, uId })

type clearUIdType = {
    type: typeof UPDATE_USER,
    uId: number | null
}
export const clearUId = (): clearUIdType => ({ type: UPDATE_USER, uId: null })

type updateCurrentPortionType = {
    type: typeof UPDATE_PORTION,
    currentPortion: number
}
export const updateCurrentPortion = (currentPortion: number): updateCurrentPortionType => ({ type: UPDATE_PORTION, currentPortion })


type getStateType = ()=> appStateType;
type dispatchType = Dispatch<actionsTypes>;
type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>

export const getUsersThunkCreator = (page: number, pageSize: number): thunkType => {
    return (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

const _followUnfollowFlow = async (dispatch: dispatchType, userId: number, method: any, actionCreator: (userId: number)=>followType | unfollowType) => {
    dispatch(toggleFollowing(true, userId))
    let response = await method(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export const unfollowTC = (userId: number): thunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), unfollow)
    }
}

export const followTC = (userId: number): thunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.getFollow.bind(usersAPI), follow);
    }
}



export default usersReducer;