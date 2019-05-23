import React from "react";
import './Footer.less';
import {Layout} from "antd";

const { Footer } = Layout;

const FooterBlock: React.FC = () => {
    return <div className="footer">
        
        <Footer className="copyright">Movi ©2019 Creator Tsoy Vladlen</Footer>
    </div>;
};

export default FooterBlock;
