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

type photosType = {
    small: string | null
    large: string | null
}

type itemsType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

type usersType = {
    items: itemsType
    totalCount: number
    error: string
}

let initialState = {
    users: [] as Array<usersType> | null,
    pageSize: 5 as number | null,
    totalUsersCount: 0 as number | null,
    currentPage: 1 as number | null,
    isFetching: true as boolean,
    isFollowing: [] as Array<number>,
    uId: null as number | null,
    currentPortion: 1 as number | null,
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
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
    userId: number | null
}
export const follow = (userId: number | null): followType => ({ type: FOLLOW, userId });

type unfollowType = {
    type: typeof UNFOLLOW,
    userId: number | null
}
export const unfollow = (userId: number | null): unfollowType => ({ type: UNFOLLOW, userId });

type setUsersType = {
    type: typeof SET_USERS,
    users: Array<usersType>
}
export const setUsers = (users: Array<usersType>): setUsersType => ({ type: SET_USERS, users });

type setCurrentPageType = {
    type: typeof SET__CURRENT__PAGE,
    currentPage: number | null
}
export const setCurrentPage = (currentPage: number | null): setCurrentPageType => ({ type: SET__CURRENT__PAGE, currentPage });

type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number | null
}
export const setTotalUsersCount = (totalUsersCount: number | null): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });

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

export const getUsersThunkCreator = (page: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, method: any, actionCreator: any) => {
    dispatch(toggleFollowing(true, userId))
    let response = await method(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowing(false, userId))
}
export const unfollowTC = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), unfollow)
    }
}

export const followTC = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.getFollow.bind(usersAPI), follow);
    }
}



export default usersReducer;