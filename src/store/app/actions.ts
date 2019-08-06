import {Dispatch} from "redux";

export const APP_SEARCH_STRING_INPUT = "APP_SEARCH_STRING_INPUT";

export const appChangeSearchInput = (search: string) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_SEARCH_STRING_INPUT, payload: search});
