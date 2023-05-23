import { getGirisler, deleteGiris, updateGiris, postGiris } from "../services/girislerService";
import { GET_GIRISLER, DELETE_GIRIS, SHOW_GIRIS_DETAIL_FORM, SET_SELECTED_GIRIS, UPDATE_GIRIS, POST_GIRIS } from "./../types/girislerTypes";

export const getGirislerAction = () => async (dispatch) => {
    let res = await getGirisler();
    dispatch({
        type: GET_GIRISLER,
        payload: res.records
    });
};

export const deleteGirisAction = (id) => async (dispatch) => {
    await deleteGiris(id);
    dispatch({
        type: DELETE_GIRIS,
        payload: id
    });
};

export const changeIsShowDetailFormAction = (isShow) => async (dispatch) => {
    dispatch({
        type: SHOW_GIRIS_DETAIL_FORM,
        payload: isShow
    });
};

export const setSelectedGirisAction = (record) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_GIRIS,
        payload: record
    });
};

export const updateGirisAction = (data) => async (dispatch) => {
    let res = await updateGiris(data);
    dispatch({
        type: UPDATE_GIRIS,
        payload: res.records[0]
    });
};

export const postGirisAction = (data) => async (dispatch) => {
    let res = await postGiris(data);
    dispatch({
        type: POST_GIRIS,
        payload: res.records[0]
    });
};
