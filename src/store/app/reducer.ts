export const CHANGE_SEARCH_INPUT = "CHANGE_SEARCH_INPUT";

export const defaultAppState = {
    search: '',
};

export const appAction = {
    // [CHANGE_SEARCH_INPUT]: (state: any) => ({search: state}),
    [CHANGE_SEARCH_INPUT]: (state: any, a:any) => {
        return {search: state}
    },
};
