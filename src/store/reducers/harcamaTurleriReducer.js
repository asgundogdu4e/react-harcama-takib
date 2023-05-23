import HarcamaTurleriTypes from "./../types/HarcamaTurleriTypes";

const initialState = {
    harcamaTurleriList: [],
    pageInfo: {
        pageSize: 10,
        pageNumber: 1,
        orderByColumnNames: [],
    },
    totalCount: 0,
    isShowDetailForm: false,
    selectedHarcamaTuru: {}
};

export const harcamaTurleri = (state = initialState, action) => {
    switch (action.type) {
        case HarcamaTurleriTypes.GET_HARCAMA_TURLERI: {
            const harcamaTurleriList = action.payload;
            return { ...state, harcamaTurleriList };
        }

        case HarcamaTurleriTypes.DELETE_HARCAMA_TURU: {
            const id = action.payload;
            let harcamaTurleriList = state.harcamaTurleriList;
            if (id) {
                harcamaTurleriList = harcamaTurleriList.filter((g) => g.id !== id)
            }
            return { ...state, harcamaTurleriList };
        }

        case HarcamaTurleriTypes.SHOW_HARCAMA_TURU_DETAIL_FORM: {
            const isShowDetailForm = action.payload;
            return { ...state, isShowDetailForm };
        }

        case HarcamaTurleriTypes.SET_SELECTED_HARCAMA_TURU: {
            let selectedHarcamaTuru = action.payload;
            return { ...state, selectedHarcamaTuru };
        }

        case HarcamaTurleriTypes.UPDATE_HARCAMA_TURU: {
            const giris = action.payload;
            let harcamaTurleriList = state.harcamaTurleriList;
            harcamaTurleriList = harcamaTurleriList.map((g) => {
                if (g.id === giris.id) {
                    return giris
                }
                else {
                    return g
                }
            })
            return { ...state, harcamaTurleriList, isShowDetailForm: false };
        }

        case HarcamaTurleriTypes.POST_HARCAMA_TURU: {
            const giris = action.payload;
            const harcamaTurleriList = [...state.harcamaTurleriList];
            harcamaTurleriList.push(giris);
            return { ...state, harcamaTurleriList, isShowDetailForm: false };
        }

        default:
            return state;
    }
};