import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import './App.less';
import Navbar from "../layouts/navbar/Navbar";
import FooterBlock from "../layouts/footer/Footer";
import Home from "./home/Home";

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
                <FooterBlock/>
            </Layout>
        </Router>
    );
};

export default App;
