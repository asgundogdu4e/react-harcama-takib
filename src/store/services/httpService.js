import axios from "axios";
import { message } from "antd";

/**
 * Token kontrolü TokenService üzerinden sorgulanıyor.
 */
const baseURL = 'http://localhost:3001/api/';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

/**
 * Bir axios client' ı yaratılıyor.
 */
const client = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    cancelToken: source.token,
});

/**
 * default davranışlar burada setleniyor.
 */
client.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
client.defaults.timeout = 60000;

/**
 * Bir request göndermeyi sağlar.
 * Request nesnesi içerisinde gönderilebilecek 'method' parametresi get, post, put ve delete olabilir.
 * Daha fazla ayrıntı için bkz: https://github.com/axios/axios
 *
 * @param {object} request Request objesi.
 * @param {object} options config objesi isteğe bağlıdır.
 * @returns {Promise} Geriye bir Promise nesnesi döndürür.
 * @example
 * beginRequest({url: "/users"}).then(response => console.log(response));
 * beginRequest({url: "/users"}, {timeout: 120000}).then(response => console.log(response));
 */
export const beginRequest = (request, options) => {
    return client(request, options).catch(handleError);
};

/**
 * Get isteği gönderir
 * Daha fazla ayrıntı için bkz: https://github.com/axios/axios
 *
 * @param {object} request Request objesi.
 * @param {object} options config objesi isteğe bağlıdır.
 * @returns {Promise} Geriye bir Promise nesnesi döndürür.
 * @example
 * getRequest("/users").then(response => console.log(response));
 * get("/users", {timeout: 120000}).then(response => console.log(response));
 */
export const getRequest = async (url, options) => {
    const result = await client.get(url, options).catch(handleError);
    if (result) {
        if (!result.data.success) {
            message.error(result.data.error);
        }
        return result.data;
    }
    return null;
};

/**
 * Post isteği gönderir
 * Daha fazla ayrıntı için bkz: https://github.com/axios/axios
 *
 * @param {object} request Request objesi.
 * @param {object} body Payload objesi.
 * @param {object} options config objesi isteğe bağlıdır.
 * @returns {Promise} Geriye bir Promise nesnesi döndürür.
 * @example
 * postRequest("/users", {firstname: Joe, lastname: "Doe"}, {timeout: 120000}).then(response => console.log(response));
 * postRequest("/users", {firstname: Joe, lastname: "Doe"}, {timeout: 120000}).then(response => console.log(response));
 */
export const postRequest = async (url, body, options) => {
    const result = await client.post(url, body, options).catch(handleError);
    if (result) {
        if (result.data?.success === false) {
            message.error(result.data.error);
            return null;
        }
        return result.data;
    }
};

export const postRequestLogin = (url, body, options) => {
    return client.post(url, body, options).catch(handleError);
};

/**
 * Put isteği gönderir
 * Daha fazla ayrıntı için bkz: https://github.com/axios/axios
 *
 * @param {object} request Request objesi.
 * @param {object} body Payload objesi.
 * @param {object} options config objesi isteğe bağlıdır.
 * @returns {Promise} Geriye bir Promise nesnesi döndürür.
 * @example
 * putRequest("/users", {firstname: Joe, lastname: "Doe"}, {timeout: 120000}).then(response => console.log(response));
 * putRequest("/users", {firstname: Joe, lastname: "Doe"}, {timeout: 120000}).then(response => console.log(response));
 */
export const putRequest = async (url, body, options) => {
    const result = await client.put(url, body, options).catch(handleError);
    if (result) {
        if (!result.data.success) {
            message.error(result.data.error);
            return null;
        }
        return result.data;
    }
};

/**
 * Delete isteği gönderir
 * Daha fazla ayrıntı için bkz: https://github.com/axios/axios
 *
 * @param {object} request Request objesi.
 * @param {object} options config objesi isteğe bağlıdır.
 * @returns {Promise} Geriye bir Promise nesnesi döndürür.
 * @example
 * deleteRequest("/users/1678", {timeout: 120000}).then(response => console.log(response));
 * deleteRequest("/users/1678", {timeout: 120000}).then(response => console.log(response));
 */
export const deleteRequest = async (url, options) => {
    const result = await client.delete(url, options).catch(handleError);
    console.log(result)
    if (result) {
        if (!result.data.success) {
            message.error(result.data.error);
        } else {
            if (result.data.count === 0) {
                message.success("Silinecek kayıt bulunamadı.");
            } else {
                message.success(result.data.count + " adet kayıt silindi.");
            }
        }
        return result.data;
    }
};

/**
 * Request' i iptal eder.
 */
export const cancelRequest = () => {
    source.cancel("Kullanıcı request' i iptal etti.");
};

/**
 * Hata fırlatıldığında çalışacak olan callback methodurur.
 *
 * @param {object} error Hata ayrıntılarını içerir
 */
const handleError = (error) => {
    if (axios.isCancel(error)) {
        console.error("Request canceled", error.message);
    } else {
        /* console.error(error);
        console.error(error.response);

        if (error.response?.status === 500) {
            message.error(error.response.data.error);
        } else if (error.response.status === 401 && error.response.data.loginMsg)
            message.error(error.response.data.loginMsg);
        else if (error.response.status === 401) {
            UserService.deleteUser(undefined);
            TokenService.deleteToken(undefined);
            YetkiService.deleteYetki(undefined);
            window.location = "/";
        } else if (error.response.data.message)
            message.error(error.response.data.message);
        else
            message.error("Handle edilmemiş hata: ", JSON.stringify(error.response.data)); */

    }
};
