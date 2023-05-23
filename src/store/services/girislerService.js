import {
    getRequest,
    deleteRequest,
    putRequest,
    postRequest
} from "./httpService";

const urlBase = "girisler";

export function getGirisler() {
    return getRequest(urlBase);
}

export function deleteGiris(id) {
    return deleteRequest(`${urlBase}/${id}`);
}

export function updateGiris(data) {
    return putRequest(`${urlBase}/${data.id}`, data);
}

export function postGiris(data) {
    return postRequest(urlBase, data);
}