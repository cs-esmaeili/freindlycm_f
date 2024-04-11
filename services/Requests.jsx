import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}`

export const getGeneralData = () => {
    return http.get(`${prefixUrl}/getGeneralData`);
};
export const userList = () => {
    return http.get(`${prefixUrl}/userList`);
};
export const gpList = () => {
    return http.get(`${prefixUrl}/gpList`);
};

export const addUser = (data) => {
    return http.post(`${prefixUrl}/addUser`, JSON.stringify(data));
};

export const deleteUser = (data) => {
    return http.post(`${prefixUrl}/deleteUser`, JSON.stringify(data));
};
