import React, {createContext, useReducer, useContext} from "react";
import {defaultAppState, appAction} from "./app/reducer";

const initialState = {
    // App Default State
    app: defaultAppState
};

const StoreContext = createContext(initialState);

const Actions: any = {
    ...appAction,
};

const reducer = (state: any, action: { type: string, payload: any }) => {
    const act = Actions[action.type];
    const update = act(action.payload);
    return {...state, ...update};
};

export const StoreProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        // @ts-ignore
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore: any = (): any => useContext(StoreContext);
