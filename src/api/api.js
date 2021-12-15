import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d51d7692-cb07-406f-9e0a-bed4a50969ef"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    getFollow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    getUnfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
}

export const authAPI = {
    getLogin() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            });
    },
    login(){
        return instance.post(`auth/login`)
            .then(response => {
                return response.data;
            })
    },
    unLogin(){
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
    },
}

export const profileAPI = {
    getUserData(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
            .then(response => {
                return response.data;
            })
    },
}
