import {Dispatch} from "redux";
import {notification} from "antd";

export const USER_UPDATE_MOVIE_TO_THE_WILL_WATCH = "USER_UPDATE_MOVIE_TO_THE_WILL_WATCH";


const openNotification = (status: string, title: string, description: string) => {
    // @ts-ignore
    notification[status]({
        message: title,
        description: description,
    });
};

export const userAddWillWatch = (id: string) =>
    (dispatch: Dispatch, getState: any) => {
        openNotification('success', 'Добавлен в "Буду смотреть"', 'This is the content of the notification.');
        getState().user.see_later.push(id);
        return dispatch({type: USER_UPDATE_MOVIE_TO_THE_WILL_WATCH, payload: getState().user.see_later});
    };

export const userRemoveWillWatch = (id: string) =>
    (dispatch: Dispatch, getState: any) => {
        openNotification('warning', 'Удален из "Буду смотреть"', 'This is the content of the notification.');
        const seeLater = getState().user.see_later.filter((val: any) => val != id);
        return dispatch({type: USER_UPDATE_MOVIE_TO_THE_WILL_WATCH, payload: seeLater});
    };
