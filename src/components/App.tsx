import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Layout} from 'antd';
import QueueAnim from 'rc-queue-anim';
import './App.less';
import Navbar from "../layouts/navbar/Navbar";
import FooterBlock from "../layouts/footer/Footer";
import Search from "../layouts/search/Search";
import Home from "./home/Home";
import Movies from "./movies/Movies";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration";
import Movie from "./movie/Movie";
import {appChangeSearchInput} from "../store/app/actions";

const defaultAnimation = [
    {opacity: [1, 0]},
];

const App: React.FC = () => {
    const {app} = useSelector((state: any) => (state));
    const dispatch = useDispatch();

    useEffect(() => {
        document.onkeydown = (e: any) => {
            if (e.keyCode === 27)
                dispatch(appChangeSearchInput(''));

            if (e.key.length <= 1 && (!app.search || app.search === ''))
                dispatch(appChangeSearchInput(e.key));
        };

        return () => {
            document.onkeydown = null
        };
    }, [app.search]);

    return <Router>
        <Layout>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/movies" component={Movies}/>
                <Route path="/movies/:id" component={Movie}/>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
            </Switch>
            <FooterBlock/>
        </Layout>
        <QueueAnim animConfig={defaultAnimation} duration={300}>
            {app.search && app.search !== '' ?
                [<Search key={1}/>]
                : null}
        </QueueAnim>
    </Router>;
};

export default App;
