import { Reducer, Action } from "redux";

export const createReducer = <S>(initialState: S) => ((reducerMap: {[key: string]: Reducer<S>}) => (state: S = initialState, action: Action): S => {
    return action.type in reducerMap ? reducerMap[action.type](state, action) : state;
});