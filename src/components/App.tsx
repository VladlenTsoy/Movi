import React from 'react';
import {Layout} from 'antd';
import './App.less';
import Navbar from "../layouts/navbar/Navbar";
import FooterBlock from "../layouts/footer/Footer";
import Banner from "./home/banner/Banner";
import Trending from "./home/trending/Trending";
import Movies from "./home/movies/Movies";
import Newest from "./home/newest/Newest";

const App: React.FC = () => {
    return (
        <Layout>
            <Navbar/>
            <Banner/>
            <Trending/>
            <Movies/>
            <Newest/>
            <FooterBlock/>
        </Layout>
    );
};

export default App;
