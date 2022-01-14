import { appStateType } from './store';
import { createSelector } from "reselect";

export const getUsers = (state: appStateType) => {
    return state.usersPage.users;
}
export const getPageSize = (state: appStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: appStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: appStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: appStateType) => {
    return state.usersPage.isFetching
}
export const getIsFollowing = (state: appStateType) => {
    return state.usersPage.isFollowing
}
export const getCurrentPortion = (state: appStateType) => state.usersPage.currentPortion;