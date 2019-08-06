import {APP_SEARCH_STRING_INPUT} from "./actions";

export const appReducer = (state = {
    search: '',
}, action: any) => {
    switch (action.type) {
        case APP_SEARCH_STRING_INPUT:
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
};