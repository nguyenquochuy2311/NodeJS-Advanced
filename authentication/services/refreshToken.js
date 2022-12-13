import axios from 'axios';

const refreshToken = (refresh_token) => {
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const param = {
        refresh_token: refresh_token
    }
    return axios.post("/api/v1/refresh-token", param, axiosConfig);
}

export { refreshToken };