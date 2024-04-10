import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}`

export const getGeneralData = () => {
    return http.get(`${prefixUrl}/getGeneralData`);
};

// export const updateRegisterPure = (data) => {
//     return http.post(`${prefixUrl}/updateRegisterPure`, JSON.stringify(data));
// };
