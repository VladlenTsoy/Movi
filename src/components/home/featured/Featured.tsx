import React from "react";
import './Featured.less';
import {Row, Col} from "antd";

const Featured: React.FC = () => {
    return <div className="featured">
        <div className="head-block">
            <span className="category">Рекомендуем</span>
            <span className="title">Мадрасес</span>
            <span className="description">Новый сезон 5 просто смотри и обсуждай.</span>
        </div>
        <div className="tabs">
            <span className="active">Сезон 5</span>
            <span>Сезон 4</span>
            <span>Сезон 3</span>
            <span>Сезон 2</span>
            <span>Сезон 1</span>
        </div>
        <div className="contents">
            <Row type="flex" gutter={15}>
                <Col lg={4}>
                    <div className="episode"></div>
                </Col>
                <Col lg={4}>
                    <div className="episode"></div>
                </Col>
                <Col lg={4}>
                    <div className="episode"></div>
                </Col>
                <Col lg={4}>
                    <div className="episode"></div>
                </Col>
                <Col lg={4}>
                    <div className="episode"></div>
                </Col>
                <Col lg={4}>
                    <div className="episode"></div>
                </Col>
            </Row>
        </div>
    </div>;
};

export default Featured;
