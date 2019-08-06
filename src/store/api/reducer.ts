const axios = require('axios');

const DOMAIN_API = 'https://api.themoviedb.org/3';

export const apiReducer = (state = {
    token: localStorage.getItem('MOVI_API_TOKEN_ACCESS'),
    guest: axios.create({baseURL: DOMAIN_API}),
}, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};