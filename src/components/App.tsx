import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import './App.less';
import Navbar from "../layouts/navbar/Navbar";
import FooterBlock from "../layouts/footer/Footer";
import Search from "../layouts/search/onSearch";
import Home from "./home/Home";
import Movies from "./movies/Movies";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration";
import Movie from "./movie/Movie";


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
        <Search/>
    </Router>;
};
export default App;
