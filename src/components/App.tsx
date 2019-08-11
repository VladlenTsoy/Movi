import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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

const defaultAnimation = [
    {opacity: [1, 0]},
];

const SearchBlock = () => {
    const [search, setSearch] = useState();

    useEffect(() => {
        document.onkeydown = (e: any) => {
            if (e.keyCode === 27)
                setSearch('');

            if (e.key.length <= 1 && (!search || search === ''))
                setSearch(e.key);
        };

        return () => {
            document.onkeydown = null
        };
    }, [search]);

    const setSearchValue = (val: string) =>
        setSearch(val);

    return <QueueAnim animConfig={defaultAnimation} duration={300}>
        {search && search !== '' ? <Search key={1} search={search} setSearch={setSearchValue}/> : null}
    </QueueAnim>
};

const App: React.FC = () => {
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
        <SearchBlock/>
    </Router>;
};
export default App;
