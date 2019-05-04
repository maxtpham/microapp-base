import { combineReducers } from "redux";
import { createReducer } from "../common/utils";
import * as types from "./types";

export default createReducer<types.IMasterStateSession>({})({
    [types.TOGGLE]: (state, action) => {
        return { ...state, collapsed: !state.collapsed};
    }
});