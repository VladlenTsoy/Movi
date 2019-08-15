import {Dispatch} from "redux";

export const MOVIE_FETCH_FILTER = "MOVIE_FETCH_FILTER";

export const fetchMovieFilter:any = (filter: any) =>
    async (dispatch: Dispatch, getState: any) => {
        const response = await getState().api.guest(`/discover/movie?with_genres=${12}&api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&primary_release_year=2019&page=${filter.page}`);
        const movies = [...getState().movie.movies, ...response.data.results];
        return dispatch({type: MOVIE_FETCH_FILTER, payload: movies, data: response.data});
    };