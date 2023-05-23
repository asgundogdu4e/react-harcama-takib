import { getCikislar, deleteCikis, updateCikis, postCikis } from "../services/cikislarService";
import { GET_CIKISLAR, DELETE_CIKIS, SHOW_CIKIS_DETAIL_FORM, SET_SELECTED_CIKIS, UPDATE_CIKIS, POST_CIKIS } from "./../types/cikislarTypes";

export const getCikislarAction = () => async (dispatch) => {
    let res = await getCikislar();
    dispatch({
        type: GET_CIKISLAR,
        payload: res.records
    });
};

export const deleteCikisAction = (id) => async (dispatch) => {
    await deleteCikis(id);
    dispatch({
        type: DELETE_CIKIS,
        payload: id
    });
};

export const changeIsShowDetailFormAction = (isShow) => async (dispatch) => {
    dispatch({
        type: SHOW_CIKIS_DETAIL_FORM,
        payload: isShow
    });
};

export const setSelectedCikisAction = (record) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_CIKIS,
        payload: record
    });
};

export const updateCikisAction = (data) => async (dispatch) => {
    let res = await updateCikis(data);
    dispatch({
        type: UPDATE_CIKIS,
        payload: res.records[0]
    });
};

export const postCikisAction = (data) => async (dispatch) => {
    let res = await postCikis(data);
    dispatch({
        type: POST_CIKIS,
        payload: res.records[0]
    });
};
