const axios = require('axios');

export const API_CHANGE_ACCESS_TOKEN = "API_CHANGE_ACCESS_TOKEN";

const DOMAIN_API = 'https://api.themoviedb.org/3';

export const defaultApiState = {
    guest: axios.create({baseURL: DOMAIN_API}),
};

export const apiAction = {
    [API_CHANGE_ACCESS_TOKEN]: (state: any) => ({api: state}),
};
