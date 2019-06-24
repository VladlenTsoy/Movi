import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import QueueAnim from 'rc-queue-anim';
import './App.less';
import Navbar from "../layouts/navbar/Navbar";
import FooterBlock from "../layouts/footer/Footer";
import Home from "./home/Home";
import Movies from "./movies/movies";
import Search from "../layouts/search/Search";
import {useStore} from "../store/useStore";
import {CHANGE_SEARCH_INPUT} from "../store/app/reducer";

const defaultAnimation = [
    {opacity: [1, 0]},
];

const App: React.FC = () => {
    let {state, dispatch} = useStore();

    useEffect(() => {
        document.onkeydown =  (e: any) => {
            if (e.keyCode === 27)
                dispatch({type: CHANGE_SEARCH_INPUT, payload: ''});

            if (e.key.length <= 1 && (!state.search || state.search === ''))
                dispatch({type: CHANGE_SEARCH_INPUT, payload: e.key});
        };

        return () => {
            document.onkeydown = null
        };
    }, [state.search, dispatch]);

    return <Router>
        <Layout>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/movies" component={Movies}/>
            </Switch>
            <FooterBlock/>
        </Layout>
        <QueueAnim animConfig={defaultAnimation} duration={300}>
            {state.search && state.search !== '' ?
                [<Search key={1}/>]
                : null}
        </QueueAnim>
    </Router>;
};

export default App;
