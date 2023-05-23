import { getHarcamaTurleri, deleteHarcamaTuru, updateHarcamaTuru, postHarcamaTuru } from "../services/harcamaTurleriService";
//import { GET_HARCAMA_TURLERI, DELETE_HARCAMA_TURU, SHOW_HARCAMA_TURU_DETAIL_FORM, SET_SELECTED_HARCAMA_TURU, UPDATE_HARCAMA_TURU, POST_HARCAMA_TURU } from "./../types/HarcamaTurleriTypes";
import HarcamaTurleriTypes from "./../types/HarcamaTurleriTypes";

export const getHarcamaTurleriAction = () => async (dispatch) => {
    let res = await getHarcamaTurleri();
    dispatch({
        type: HarcamaTurleriTypes.GET_HARCAMA_TURLERI,
        payload: res.records
    });
};

export const deleteHarcamaTuruAction = (id) => async (dispatch) => {
    await deleteHarcamaTuru(id);
    dispatch({
        type: HarcamaTurleriTypes.DELETE_HARCAMA_TURU,
        payload: id
    });
};

export const changeIsShowDetailFormAction = (isShow) => async (dispatch) => {
    dispatch({
        type: HarcamaTurleriTypes.SHOW_HARCAMA_TURU_DETAIL_FORM,
        payload: isShow
    });
};

export const setSelectedHarcamaTuruAction = (record) => async (dispatch) => {
    dispatch({
        type: HarcamaTurleriTypes.SET_SELECTED_HARCAMA_TURU,
        payload: record
    });
};

export const updateHarcamaTuruAction = (data) => async (dispatch) => {
    let res = await updateHarcamaTuru(data);
    dispatch({
        type: HarcamaTurleriTypes.UPDATE_HARCAMA_TURU,
        payload: res.records[0]
    });
};

export const postHarcamaTuruAction = (data) => async (dispatch) => {
    let res = await postHarcamaTuru(data);
    dispatch({
        type: HarcamaTurleriTypes.POST_HARCAMA_TURU,
        payload: res.records[0]
    });
};
