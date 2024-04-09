import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}`

export const tokenPriceList = () => {
    return http.get(`${prefixUrl}/tokenPriceList`);
};

// export const updateRegisterPure = (data) => {
//     return http.post(`${prefixUrl}/updateRegisterPure`, JSON.stringify(data));
// };
