import {Dispatch} from "redux";
import {notification} from "antd";

export const USER_ADD_MOVIE_TO_THE_WILL_WATCH = "USER_ADD_MOVIE_TO_THE_WILL_WATCH";


const openNotification = () => {
    notification.success({
        message: 'Добавлен в "Буду смотреть"',
        description:
            'This is the content of the notification.',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

export const userAddWillWatch = (id: string) =>
    (dispatch: Dispatch) => {
        openNotification();
        return dispatch({type: USER_ADD_MOVIE_TO_THE_WILL_WATCH, payload: id});
    };
