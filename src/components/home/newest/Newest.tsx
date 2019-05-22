import React from "react";
import './Newest.less';
import {Row, Col, Button} from "antd";
import Trending from "../trending/Trending";

const Newest: React.FC = () => {
    return <div className="newest">
        <div className="title-block">
            <div className="title">
                Новейшие эпизоды
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Сегодня</span>
                <span>За неделю</span>
                <span>За месяц</span>
                <span>За 3 месяца</span>
            </div>
        </div>
    </div>;
};

export default Newest;
