import {
    getRequest,
    deleteRequest,
    putRequest,
    postRequest
} from "./httpService";

const urlBase = "harcamaTurleri";

export function getHarcamaTurleri() {
    return getRequest(urlBase);
}

export function deleteHarcamaTuru(id) {
    return deleteRequest(`${urlBase}/${id}`);
}

export function updateHarcamaTuru(data) {
    return putRequest(`${urlBase}/${data.id}`, data);
}

export function postHarcamaTuru(data) {
    return postRequest(urlBase, data);
}