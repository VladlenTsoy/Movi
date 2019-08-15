import {MOVIE_FETCH_FILTER} from "./actions";

export const movieReducer = (state = {
    movies: [],
}, action: any) => {
    switch (action.type) {
        case MOVIE_FETCH_FILTER:
            return {
                ...state,
                movies: action.payload
            };
        default:
            return state;
    }
};