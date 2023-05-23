import {
    getRequest,
    deleteRequest,
    putRequest,
    postRequest
} from "./httpService";

const urlBase = "cikislar";

export function getCikislar() {
    return getRequest(urlBase);
}

export function deleteCikis(id) {
    return deleteRequest(`${urlBase}/${id}`);
}

export function updateCikis(data) {
    return putRequest(`${urlBase}/${data.id}`, data);
}

export function postCikis(data) {
    return postRequest(urlBase, data);
}