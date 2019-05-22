import React from 'react';
import {Layout} from 'antd';
import './App.less';
import Navbar from "../layouts/navbar/Navbar";
import FooterBlock from "../layouts/footer/Footer";
import Banner from "./home/banner/Banner";

const App: React.FC = () => {
    return (
        <Layout>
            <Navbar/>
            <Banner/>
            <FooterBlock/>
        </Layout>
    );
};

export default App;
