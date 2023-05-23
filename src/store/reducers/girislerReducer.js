import { GET_GIRISLER, DELETE_GIRIS, SHOW_GIRIS_DETAIL_FORM, SET_SELECTED_GIRIS, UPDATE_GIRIS, POST_GIRIS } from "./../types/girislerTypes";

const initialState = {
    girislerList: [],
    pageInfo: {
        pageSize: 10,
        pageNumber: 1,
        orderByColumnNames: [],
    },
    totalCount: 0,
    isShowDetailForm: false,
    selectedGiris: {}
};

export const girisler = (state = initialState, action) => {
    switch (action.type) {
        case GET_GIRISLER: {
            const girislerList = action.payload;
            return { ...state, girislerList };
        }

        case DELETE_GIRIS: {
            const id = action.payload;
            let girislerList = state.girislerList;
            if (id) {
                girislerList = girislerList.filter((g) => g.id !== id)
            }
            return { ...state, girislerList };
        }

        case SHOW_GIRIS_DETAIL_FORM: {
            const isShowDetailForm = action.payload;
            return { ...state, isShowDetailForm };
        }

        case SET_SELECTED_GIRIS: {
            let selectedGiris = action.payload;
            return { ...state, selectedGiris };
        }

        case UPDATE_GIRIS: {
            const giris = action.payload;
            let girislerList = state.girislerList;
            girislerList = girislerList.map((g) => {
                if (g.id === giris.id) {
                    return giris
                }
                else {
                    return g
                }
            })
            return { ...state, girislerList, isShowDetailForm: false };
        }

        case POST_GIRIS: {
            const giris = action.payload;
            const girislerList = [...state.girislerList];
            girislerList.push(giris);
            return { ...state, girislerList, isShowDetailForm: false };
        }

        default:
            return state;
    }
};