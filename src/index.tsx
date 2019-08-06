import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {LocaleProvider} from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {fab, faTelegram} from '@fortawesome/free-brands-svg-icons'
import {store} from "./store/rootReducer";
import {Provider} from "react-redux";

library.add(fab, faTelegram, faPlay);

ReactDOM.render(<LocaleProvider locale={ruRU}>
    <Provider store={store}>
        <App/>
    </Provider>
</LocaleProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
