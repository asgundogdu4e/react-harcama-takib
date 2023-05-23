import { GET_CIKISLAR, DELETE_CIKIS, SHOW_CIKIS_DETAIL_FORM, SET_SELECTED_CIKIS, UPDATE_CIKIS, POST_CIKIS } from "./../types/cikislarTypes";

const initialState = {
    cikislarList: [],
    pageInfo: {
        pageSize: 10,
        pageNumber: 1,
        orderByColumnNames: [],
    },
    totalCount: 0,
    isShowDetailForm: false,
    selectedCikis: {}
};

export const cikislar = (state = initialState, action) => {
    switch (action.type) {
        case GET_CIKISLAR: {
            const cikislarList = action.payload;
            return { ...state, cikislarList };
        }

        case DELETE_CIKIS: {
            const id = action.payload;
            let cikislarList = state.cikislarList;
            if (id) {
                cikislarList = cikislarList.filter((g) => g.id !== id)
            }
            return { ...state, cikislarList };
        }

        case SHOW_CIKIS_DETAIL_FORM: {
            const isShowDetailForm = action.payload;
            return { ...state, isShowDetailForm };
        }

        case SET_SELECTED_CIKIS: {
            let selectedCikis = action.payload;
            return { ...state, selectedCikis };
        }

        case UPDATE_CIKIS: {
            const cikis = action.payload;
            let cikislarList = state.cikislarList;
            cikislarList = cikislarList.map((g) => {
                if (g.id === cikis.id) {
                    return cikis
                }
                else {
                    return g
                }
            })
            return { ...state, cikislarList, isShowDetailForm: false };
        }

        case POST_CIKIS: {
            const cikis = action.payload;
            const cikislarList = [...state.cikislarList];
            cikislarList.push(cikis);
            return { ...state, cikislarList, isShowDetailForm: false };
        }

        default:
            return state;
    }
};