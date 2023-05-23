import { combineReducers } from "redux";
import { girisler } from "./girislerReducer";
import { harcamaTurleri } from "./harcamaTurleriReducer";
import { cikislar } from "./cikislarReducer";

const rootReducer = combineReducers({
    girisler,
    harcamaTurleri,
    cikislar
});

export default rootReducer;
