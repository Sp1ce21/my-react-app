import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f4ea8b1d-9745-41a8-9bd9-42869dcd4740"
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
    },
    getUnfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
}

export const authAPI = {
    getLogin() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const profileAPI = {
    getUserData(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    updateProfilePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } )
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}