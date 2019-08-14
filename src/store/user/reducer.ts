import {USER_ADD_MOVIE_TO_THE_WILL_WATCH} from "./actions";

export const userReducer = (state = {
    see_later: null,
}, action: any) => {
    switch (action.type) {
        case USER_ADD_MOVIE_TO_THE_WILL_WATCH:
            return {
                ...state,
                see_later: action.payload
            };
        default:
            return state;
    }
};