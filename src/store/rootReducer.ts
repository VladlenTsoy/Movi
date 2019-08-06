import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {apiReducer} from "./api/reducer";
import {appReducer} from "./app/reducer";

const rootReducer = combineReducers({
    app: appReducer,
    api: apiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));