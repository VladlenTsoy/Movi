import React from "react";
import './Compilation.less';
import {Row, Col} from "antd";

const Compilation: React.FC = () => {
    return <div className="compilation">
        <div className="title-block">
            <div className="title">
                День святого Валентина
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Все</span>
                <span>Драма</span>
                <span>Комедия</span>
                <span>Мюзиклы</span>
                <span>Романтика</span>
            </div>
        </div>
        <div className="contents">
            <Row type="flex" gutter={15}>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
                <Col lg={3}>
                    <div className="movie"></div>
                </Col>
            </Row>
        </div>
    </div>;
};

export default Compilation;
