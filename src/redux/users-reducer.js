import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";


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
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: [],
    uId: null,
    currentPortion: 1,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET__CURRENT__PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowing = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING, isFetching, userId });
export const updateUser = (uId) => ({type: UPDATE_USER, uId })
export const clearUId = () => ({type: UPDATE_USER, uId: null })
export const updateCurrentPortion = (currentPortion) => ({type: UPDATE_PORTION, currentPortion })

export const getUsersThunkCreator = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

const followUnfollowFlow = async (dispatch, userId, method, actionCreator) => {
    dispatch(toggleFollowing(true, userId))
    let response = await method(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export const unfollowTC = userId => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), unfollow)
    }
}

export const followTC = userId => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.getFollow.bind(usersAPI), follow);
    }
}



export default usersReducer;