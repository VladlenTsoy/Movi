import React from "react";
import './Newest.less';
import {Row, Col, Button} from "antd";

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
        <div className="contents">
            <Row type="flex" gutter={15}>
                <Col>
                    <div className="episode"></div>
                </Col>
                <Col>
                    <div className="episode"></div>
                </Col>
                <Col>
                    <div className="episode"></div>
                </Col>
                <Col>
                    <div className="episode"></div>
                </Col>
                <Col>
                    <div className="episode"></div>
                </Col>
            </Row>
        </div>
    </div>;
};

export default Newest;
